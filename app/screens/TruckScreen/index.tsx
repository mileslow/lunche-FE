import React, { useMemo, useCallback, FC, useEffect, useState } from 'react'
// libs
import { ImageBackground, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
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
import { truckSelector, truckCategoriesSelector } from 'store/trucks/selectors'
import { getTruck } from 'store/trucks/thunks'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// hooks
import useTruckInfo from 'hooks/useTruckInfo'
// assets
import ChickenIcon from 'assets/svg/chicken.svg'
// styles
import styles, { TRUCK_IMAGE_HEIGHT } from './styles'
import { Colors, Spacing } from 'styles'

const DATA = [
  { icon: <ChickenIcon width={24} height={24} />, name: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, name: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, name: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, name: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, name: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, name: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, name: 'Chicken' },
]

const TruckScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.TruckScreen>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const insets = useSafeAreaInsets()

  const [isLoading, setLoading] = useState(false)

  const currentTruck = useSelector(truckSelector)

  const truckCategories = useSelector(truckCategoriesSelector)

  const translationY = useSharedValue(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(getTruck(route.params.id))
      setLoading(false)
    }
    fetchData()
  }, [])

  const END_ANIM_POSITION = useMemo(() => TRUCK_IMAGE_HEIGHT - Spacing.header - insets.top, [insets])

  const info = useTruckInfo(currentTruck)

  const redirectToAbout = useCallback(() => {
    navigation.navigate(Routes.AboutTruckScreen)
  }, [navigation])

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const subNavStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value < END_ANIM_POSITION ? 0 : translationY.value - END_ANIM_POSITION }],
  }))

  return (
    <View style={styles.screen}>
      <Header translationY={translationY} />

      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        <View style={styles.truckInfo}>
          <ImageBackground style={styles.truckImage} source={{ uri: currentTruck.mainPhoto }} />
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
          <View>
            <CategoriesList data={DATA} />
          </View>
        </Animated.View>

        <Divider />
        <MealItem />
        <Divider />
        <MealItem withDiscount />
        <Divider />
        <MealItem />
        <Divider />
        <MealItem />
        <Divider />
        <MealItem withDiscount />
      </Animated.ScrollView>
      {isLoading && <Spinner />}
    </View>
  )
}

export default TruckScreen
