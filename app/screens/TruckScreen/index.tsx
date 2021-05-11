import React, { useMemo, useCallback, FC } from 'react'
// libs
import { ImageBackground, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
// assets
import ChickenIcon from 'assets/svg/chicken.svg'
import RatingsIcon from 'assets/svg/ratings.svg'
import ClockIcon from 'assets/svg/clock.svg'
import DistanceIcon from 'assets/svg/distance.svg'
// styles
import styles, { TRUCK_IMAGE_HEIGHT } from './styles'
import { Colors, Spacing } from 'styles'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { StackScreenProps } from '@react-navigation/stack'

const DATA = [
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
]

const TruckScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.AboutTruckScreen>> = ({ navigation }) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const translationY = useSharedValue(0)

  const END_ANIM_POSITION = useMemo(() => TRUCK_IMAGE_HEIGHT - Spacing.header - insets.top, [insets])

  const info = useMemo(
    () => [
      { icon: <RatingsIcon />, text: '4.3 (200+ ratings)' },
      { icon: <ClockIcon />, text: '25 min' },
      { icon: <DistanceIcon />, text: '2 km' },
    ],
    [],
  )

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
          <ImageBackground style={styles.truckImage} source={require('./Header-image.png')} />
          <TruckGradient />
          <View style={styles.truckTitle}>
            <Typography variant={TypographyVariants.subhead} color={Colors.basic} style={styles.subhead}>
              Dined
            </Typography>
            <Typography
              variant={TypographyVariants.smallBody}
              color={Colors.basic}
              style={[styles.subhead, styles.underLine]}
              onPress={redirectToAbout}
            >
              {t('truckScreen:aboutUs')}
            </Typography>
          </View>
          <StringList data={['Chinese', 'American', 'Deshi food']} color={Colors.basic} style={styles.categories} />
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
    </View>
  )
}

export default TruckScreen
