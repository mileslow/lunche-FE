import React, { FC, memo, useCallback, useState } from 'react'
// libs
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import reject from 'lodash.reject'
// components
import Header from 'components/Header'
import Spinner from 'components/Spinner'
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

const FavoritePlacesScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.PlacesTab>> = ({
  navigation,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const [searchResult, setSearchResult] = useState<Truck[]>([])

  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  useFocusEffect(
    useCallback(() => {
      const fetchTrucks = async () => {
        setLoading(true)
        const result = await dispatch(getTrucks({ onlyFavorite: true }))
        if (getTrucks.fulfilled.match(result)) {
          setSearchResult(result.payload.data)
        }
        setLoading(false)
      }

      fetchTrucks()
    }, []),
  )

  const handleFavoritePress = useCallback(async (id: number) => {
    setLoading(true)
    const result = await dispatch(removeFavorite(id))
    if (removeFavorite.fulfilled.match(result)) {
      setSearchResult((prevState) => reject(prevState, ['id', id]))
    }
    setLoading(false)
  }, [])

  const keyExtractor = useCallback((item: Truck) => `${item.id}`, [])

  const renderSearchItem = useCallback(
    ({ item }) => (
      <TruckCard
        item={item}
        onFavoritePress={() => handleFavoritePress(item.id)}
        onPress={() => navigation.navigate(Routes.TruckScreen, { id: item.id })}
      />
    ),
    [navigation],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack title={t('favoritePlacesScreen:headerTitle')} />
      <FlatList
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.searchContent}
        data={searchResult}
        renderItem={renderSearchItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      {isLoading && <Spinner />}
    </View>
  )
}

export default memo(FavoritePlacesScreen)
