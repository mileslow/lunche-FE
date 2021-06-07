import React, { FC, memo, useCallback, useReducer } from 'react'
// libs
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import reject from 'lodash.reject'
// components
import Header from 'components/Header'
import InfinityScroll from 'components/InfinityScroll'
import TruckCard from 'screens/MainScreen/components/TruckCard'
// store
import { Truck } from 'store/trucks/types'
import { getTrucks } from 'store/trucks/thunks'
import { removeFavorite } from 'store/favorites/thunks'
// types
import { AppDispatch } from 'store'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// styles
import styles from './styles'

type State = {
  isLoading: boolean
  trucks: Truck[]
  meta: {
    page: number
    pageCount: number
  }
}

const initialState = {
  isLoading: false,
  trucks: [],
  meta: {
    page: 1,
    pageCount: 1,
  },
}

const FavoritePlacesScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.PlacesTab>> = ({
  navigation,
}) => {
  const [state, setState] = useReducer(
    (store: State, newStore: Partial<State>) => ({ ...store, ...newStore }),
    initialState,
  )

  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const fetchTrucks = useCallback(
    async (params?: { page: number }) => {
      setState({ isLoading: true })
      const result = await dispatch(getTrucks({ onlyFavorite: true, page: params?.page }))
      if (getTrucks.fulfilled.match(result)) {
        setState({
          isLoading: false,
          trucks: params?.page === 1 ? result.payload.data : [...state.trucks, ...result.payload.data],
          meta: { page: result.payload.page, pageCount: result.payload.pageCount },
        })
        return
      }
      setState({ isLoading: false })
    },
    [dispatch, state.trucks],
  )

  useFocusEffect(
    useCallback(() => {
      fetchTrucks()
    }, []),
  )

  const handleFavoritePress = useCallback(
    async (id: number) => {
      setState({ isLoading: true })
      const result = await dispatch(removeFavorite(id))
      if (removeFavorite.fulfilled.match(result)) {
        setState({ isLoading: false, trucks: reject(state.trucks, ['id', id]) })
        return
      }
      setState({ isLoading: false })
    },
    [state.trucks, dispatch],
  )

  const renderSearchItem = useCallback(
    ({ item }) => (
      <TruckCard
        item={item}
        onFavoritePress={() => handleFavoritePress(item.id)}
        onPress={() => navigation.navigate(Routes.TruckScreen, { id: item.id })}
      />
    ),
    [navigation, handleFavoritePress],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack title={t('favoritePlacesScreen:headerTitle')} />
      <InfinityScroll
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.searchContent}
        data={state.trucks}
        renderItem={renderSearchItem}
        showsVerticalScrollIndicator={false}
        meta={state.meta}
        loadResources={fetchTrucks}
        isLoading={state.isLoading}
      />
    </View>
  )
}

export default memo(FavoritePlacesScreen)
