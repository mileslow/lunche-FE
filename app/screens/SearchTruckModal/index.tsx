import React, { FC, memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, ImageBackground, Keyboard, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import { StackScreenProps } from '@react-navigation/stack'
import debounce from 'lodash.debounce'
// components
import Input from 'components/Form/Input'
import Typography, { TypographyVariants } from 'components/Typography'
import Header from 'components/Header'
import Spinner from 'components/Spinner'
import TruckCard from 'screens/MainScreen/components/TruckCard'
import Button, { ButtonTypes } from 'components/Button'
// store
import { getTrucks } from 'store/trucks/thunks'
import { currentPositionSelector } from 'store/general/selectors'
import { foodCategoriesSelector } from 'store/foodCategories/selectors'
import { FoodCategory } from 'store/foodCategories/types'
import { Truck } from 'store/trucks/types'
import { AppDispatch } from 'store'
// services
import { getImageBySize } from 'services/utils'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// assets
import burgerAnimation from 'assets/lottie/burger.json'
import SearchIcon from 'assets/svg/search.svg'
import CloseIcon from 'assets/svg/close.svg'
// styles
import { Colors } from 'styles'
import styles, { CATEGORY_HEIGHT, CATEGORY_WIDTH } from './styles'

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

  const keyExtractor = useCallback((item: Truck | FoodCategory) => `${item.id}`, [])

  const renderItem = useCallback(
    ({ item }) => (
      <Button style={styles.category} type={ButtonTypes.link} onPress={() => setSearchText(item.name)}>
        <ImageBackground
          key={item.id}
          source={{ uri: getImageBySize(item.photo, CATEGORY_WIDTH, CATEGORY_HEIGHT), cache: 'force-cache' }}
          style={styles.categoryImage}
        >
          <View style={styles.overlay} />
          <Typography variant={TypographyVariants.subhead} color={Colors.basic}>
            {item.name}
          </Typography>
        </ImageBackground>
      </Button>
    ),
    [],
  )

  const renderSearchItem = useCallback(
    ({ item }) => <TruckCard item={item} onPress={() => navigation.navigate(Routes.TruckScreen, { id: item.id })} />,
    [navigation],
  )

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

  const renderContent = useMemo<{ [x in typeof TypeContent[keyof typeof TypeContent]]: () => ReactElement }>(
    () => ({
      categories: () => (
        <FlatList
          keyboardShouldPersistTaps='always'
          horizontal={false}
          numColumns={2}
          contentContainerStyle={styles.scrollContent}
          data={foodCategories}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onScrollBeginDrag={Keyboard.dismiss}
        />
      ),
      results: () => (
        <FlatList
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.searchContent}
          data={searchResult}
          renderItem={renderSearchItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={Keyboard.dismiss}
        />
      ),
      empty: () => (
        <View style={styles.placeholderView}>
          <LottieView source={burgerAnimation} style={styles.burgerStyle} autoPlay loop />
          <Typography
            variant={TypographyVariants.subhead}
            weight='bold'
            color={Colors.gunsmoke}
            style={styles.notFoundText}
          >
            {t('searchTruckModal:notFound')}
          </Typography>
          <Typography variant={TypographyVariants.body}>{t('searchTruckModal:placeholder')}</Typography>
        </View>
      ),
    }),
    [searchResult, foodCategories, renderSearchItem],
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
      {renderContent[typeContent]()}
      {isLoading && <Spinner />}
    </View>
  )
}

export default memo(SearchTruckModal)
