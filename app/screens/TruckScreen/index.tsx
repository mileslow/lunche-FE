import React, { useMemo, useCallback, FC, useEffect, useState, Fragment } from 'react'
// libs
import { ImageBackground, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import allSettled from 'promise.allsettled'
import map from 'lodash.map'
import filter from 'lodash.filter'
import intersection from 'lodash.intersection'
// components
import CategoriesList from 'components/CategoriesList'
import Divider from 'components/Divider'
import StringList from 'components/StringList'
import InfoWithIconList from 'components/InfoWithIconList'
import SearchButton from 'components/Button/SearchButton'
import Typography, { TypographyVariants } from 'components/Typography'
import MealItem from 'screens/TruckScreen/components/MealItem'
import TruckGradient from 'screens/TruckScreen/components/TruckGradient'
import Header from 'screens/TruckScreen/components/Header'
import Spinner from 'components/Spinner'
// store
import { AppDispatch } from 'store'
import { truckSelector, truckCategoriesSelector, menuItemsSelector } from 'store/trucks/selectors'
import { getTruck, getTruckMenuItems } from 'store/trucks/thunks'
import { clearTruckScreen } from 'store/commonActions'
import { getFoodTypes } from 'store/foodTypes/thunks'
import { foodTypesSelector } from 'store/foodTypes/selectors'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// hooks
import useTruckInfo from 'hooks/useTruckInfo'
// utils
import { getImageBySize } from 'services/utils'
// styles
import styles, { TRUCK_IMAGE_HEIGHT } from './styles'
import { Colors, Metrics } from 'styles'

const TruckScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.TruckScreen>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const insets = useSafeAreaInsets()

  const [isLoading, setLoading] = useState<boolean>(false)

  const [selectedTypes, setSelectedTypes] = useState<number[]>([])

  const currentTruck = useSelector(truckSelector)

  const truckCategories = useSelector(truckCategoriesSelector)

  const foodTypes = useSelector(foodTypesSelector)

  const menuItems = useSelector(menuItemsSelector)

  const translationY = useSharedValue(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await allSettled([
        dispatch(getTruck(route.params.id)),
        dispatch(getFoodTypes()),
        dispatch(getTruckMenuItems({ id: route.params.id })),
      ])
      setLoading(false)
    }
    fetchData()
    return () => {
      dispatch(clearTruckScreen())
    }
  }, [dispatch, setLoading, route.params.id])

  const END_ANIM_POSITION = useMemo(() => TRUCK_IMAGE_HEIGHT - Metrics.header - insets.top, [insets])

  const info = useTruckInfo(currentTruck)

  const redirectToAbout = useCallback(() => {
    navigation.navigate(Routes.AboutTruckScreen)
  }, [navigation])

  const handlePressFoodType = useCallback(
    (id) => {
      const foodTypeIds = new Set(selectedTypes)
      foodTypeIds.has(id) ? foodTypeIds.delete(id) : foodTypeIds.add(id)
      setSelectedTypes([...foodTypeIds])
    },
    [selectedTypes, setSelectedTypes],
  )

  const renderMenuItems = useMemo(() => {
    const menu = selectedTypes.length
      ? filter(menuItems, (item) => !!intersection(selectedTypes, map(item.foodTypes, 'id')).length)
      : menuItems
    return map(menu, (item) => (
      <Fragment key={item.id}>
        <Divider />
        <MealItem
          item={item}
          onPress={() => navigation.navigate(Routes.DishModal, { id: item.id, truckId: currentTruck.id })}
        />
      </Fragment>
    ))
  }, [selectedTypes, menuItems, currentTruck])

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const subNavStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value < END_ANIM_POSITION ? 0 : translationY.value - END_ANIM_POSITION }],
  }))

  return (
    <View style={styles.screen}>
      <Header translationY={translationY} />

      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View style={styles.truckInfo}>
          {currentTruck.mainPhoto ? (
            <ImageBackground
              style={styles.truckImage}
              source={{
                uri: getImageBySize(currentTruck.mainPhoto, Metrics.truckImgWidth, Metrics.truckImgHeight),
              }}
            />
          ) : null}
          <TruckGradient />
          <View style={styles.truckTitle}>
            <View style={styles.titleWrap}>
              <Typography
                variant={TypographyVariants.subhead}
                color={Colors.basic}
                style={styles.subhead}
                numberOfLines={2}
              >
                {currentTruck.name}
              </Typography>
            </View>
            <Typography
              variant={TypographyVariants.smallBody}
              color={Colors.basic}
              style={[styles.subhead, styles.underLine]}
              onPress={redirectToAbout}
            >
              {t('truckScreen:aboutUs')}
            </Typography>
          </View>
          <StringList data={truckCategories} color={Colors.basic} style={styles.categories} />
          <InfoWithIconList data={info} color={Colors.basic} style={styles.info} />
        </View>

        <Animated.View style={[styles.animSubNavigation, subNavStyle]}>
          <View style={styles.subNavigation}>
            <Typography variant={TypographyVariants.h3}>{t('truckScreen:menuTitle')}</Typography>
            <SearchButton onPress={() => null} />
          </View>
          <CategoriesList active={selectedTypes} data={foodTypes} onPress={handlePressFoodType} />
        </Animated.View>

        {renderMenuItems}
      </Animated.ScrollView>
      {isLoading && <Spinner />}
    </View>
  )
}

export default TruckScreen
