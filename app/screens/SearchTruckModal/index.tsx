import React, { FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import debounce from 'lodash.debounce'
// components
import Input from 'components/Form/Input'
import Header from 'components/Header'
import Spinner from 'components/Spinner'
import Button, { ButtonTypes } from 'components/Button'
import CategoriesList from 'screens/SearchTruckModal/components/CategoriesList'
import SearchResults from 'screens/SearchTruckModal/components/SearchResults'
import EmptyView from 'screens/SearchTruckModal/components/EmptyView'
// store
import { getTrucks } from 'store/trucks/thunks'
import { currentPositionSelector } from 'store/general/selectors'
import { foodCategoriesSelector } from 'store/foodCategories/selectors'
import { Truck } from 'store/trucks/types'
import { AppDispatch } from 'store'
// services
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// assets
import SearchIcon from 'assets/svg/search.svg'
import CloseIcon from 'assets/svg/close.svg'
// styles
import styles from './styles'

enum TypeContent {
  Categories = 'categories',
  Results = 'results',
  Empty = 'empty',
}

const SearchTruckModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.SearchTruckModal>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const foodCategories = useSelector(foodCategoriesSelector)

  const currentPosition = useSelector(currentPositionSelector)

  const [searchResult, setSearchResult] = useState<Truck[]>([])

  const [searchText, setSearchText] = useState<string>('')

  const [isLoading, setLoading] = useState<boolean>(false)

  const fetchTrucks = useCallback(
    async (search: string) => {
      if (search.length > 2) {
        setLoading(true)
        const result = await dispatch(
          getTrucks({ search, latitude: currentPosition?.lat, longitude: currentPosition?.lng }),
        )
        if (getTrucks.fulfilled.match(result)) {
          setSearchResult(result.payload.data)
        }
        setLoading(false)
      } else {
        setSearchResult([])
      }
    },
    [setSearchResult, dispatch, currentPosition],
  )

  const debouncedFetchTrucks = useRef(debounce(fetchTrucks, 700)).current

  useEffect(() => {
    debouncedFetchTrucks(searchText)
  }, [debouncedFetchTrucks, searchText])

  const closeIcon = useCallback(
    (callback, size?: number) => () => (
      <Button type={ButtonTypes.icon} onPress={callback}>
        <CloseIcon width={size} height={size} />
      </Button>
    ),
    [],
  )

  const searchInputIcon = useCallback(() => <SearchIcon />, [])

  const typeContent = useMemo<typeof TypeContent[keyof typeof TypeContent]>(
    () =>
      !searchText
        ? TypeContent.Categories
        : searchText && searchResult.length
        ? TypeContent.Results
        : TypeContent.Empty,
    [searchText, searchResult],
  )

  const renderContent = useMemo<{ [x in typeof TypeContent[keyof typeof TypeContent]]: ReactNode }>(
    () => ({
      categories: <CategoriesList foodCategories={foodCategories} setCategory={setSearchText} />,
      results: (
        <SearchResults
          searchResult={searchResult}
          onPress={(id: number) => navigation.navigate(Routes.TruckScreen, { id })}
        />
      ),
      empty: <EmptyView />,
    }),
    [searchResult, foodCategories, navigation],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header left={closeIcon(() => navigation.goBack(), 28)} />
      <Input
        placeholder={t('searchTruckModal:inputPlaceholder')}
        containerStyle={styles.input}
        leftIcon={searchInputIcon}
        rightIcon={closeIcon(() => setSearchText(''))}
        value={searchText}
        onChangeText={setSearchText}
      />
      {renderContent[typeContent]}
      {isLoading && <Spinner />}
    </View>
  )
}

export default memo(SearchTruckModal)
