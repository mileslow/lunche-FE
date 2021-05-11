import React, { useMemo, useCallback } from 'react'
// libs
import { ImageBackground, View, StatusBar, StatusBarStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
// components
import CategoriesList from 'components/CategoriesList'
import Divider from 'components/Divider'
import StringList from 'components/StringList'
import InfoWithIconList from 'components/InfoWithIconList'
import SearchButton from 'components/Button/SearchButton'
import BackButton from 'components/Button/BackButton'
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import ShareIcon from 'components/AnimatedSvgComponents/ShareIcon'
import HeartIcon from 'components/AnimatedSvgComponents/HeartIcon'
import MealItem from 'screens/TruckScreen/components/MealItem'
import TruckGradient from 'screens/TruckScreen/components/TruckGradient'
// assets
import ChickenIcon from 'assets/svg/chicken.svg'
import RatingsIcon from 'assets/svg/ratings.svg'
import ClockIcon from 'assets/svg/clock.svg'
import DistanceIcon from 'assets/svg/distance.svg'
// styles
import styles, { TRUCK_IMAGE_HEIGHT } from './styles'
import { Colors, Spacing } from 'styles'

const DATA = [
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
]

const setBarStyle = (style: StatusBarStyle) => StatusBar.setBarStyle(style)

const TruckScreen = () => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const statusBarStyle = useSharedValue('light-content')

  useFocusEffect(
    useCallback(() => {
      statusBarStyle.value = 'light-content'
      setBarStyle('light-content')
    }, []),
  )

  const END_ANIM_POSITION = useMemo(() => TRUCK_IMAGE_HEIGHT - Spacing.header - insets.top, [insets])

  const info = useMemo(
    () => [
      { icon: <RatingsIcon />, text: '4.3 (200+ ratings)' },
      { icon: <ClockIcon />, text: '25 min' },
      { icon: <DistanceIcon />, text: '2 km' },
    ],
    [],
  )

  const translationY = useSharedValue(0)

  useDerivedValue(() => {
    if (statusBarStyle.value !== 'dark-content' && translationY.value >= END_ANIM_POSITION) {
      runOnJS(setBarStyle)('dark-content')
      statusBarStyle.value = 'dark-content'
      return
    }

    if (statusBarStyle.value !== 'light-content' && translationY.value < END_ANIM_POSITION) {
      runOnJS(setBarStyle)('light-content')
      statusBarStyle.value = 'light-content'
      return
    }
  }, [])

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.transparent, Colors.basic]),
  }))

  const truckImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value < END_ANIM_POSITION ? 0 : translationY.value - END_ANIM_POSITION }],
  }))

  const shareIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.basic, Colors.midNightMoss]),
  }))

  const heartIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.basic, Colors.midNightMoss]),
  }))

  const backIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.basic, Colors.midNightMoss]),
  }))

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[styles.header, { paddingTop: insets.top, minHeight: Spacing.header + insets.top }, headerStyle]}
      >
        <BackButton style={{ marginHorizontal: Spacing.base }} iconAnimatedProps={backIconAnimatedProps} />
        <View style={styles.rightNav}>
          <Button type={ButtonTypes.icon} onPress={() => null} style={{ marginHorizontal: Spacing.base }}>
            <HeartIcon iconAnimatedProps={heartIconAnimatedProps} />
          </Button>
          <Button type={ButtonTypes.icon} onPress={() => null} style={{ marginHorizontal: Spacing.base }}>
            <ShareIcon iconAnimatedProps={shareIconAnimatedProps} />
          </Button>
        </View>
      </Animated.View>

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
            >
              {t('truckScreen:aboutUs')}
            </Typography>
          </View>
          <StringList data={['Chinese', 'American', 'Deshi food']} color={Colors.basic} style={styles.categories} />
          <InfoWithIconList data={info} color={Colors.basic} style={styles.info} />
        </View>

        <Animated.View style={[styles.animSubNavigation, truckImageStyle]}>
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
