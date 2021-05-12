import React, { memo, useRef, useState, useCallback, FC, useEffect } from 'react'
// libs
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedScrollHandler,
  useAnimatedProps,
  interpolate,
} from 'react-native-reanimated'
import { PanGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { StackScreenProps } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
// components
import Spinner from 'components/Spinner'
import TruckCard from 'screens/MainScreen/components/TruckCard'
import SubNavigation from 'screens/MainScreen/components/SubNavigation'
import HeaderWithLocation from 'screens/MainScreen/components/HeaderWithLocation'
import HeaderTransparent from 'screens/MainScreen/components/HeaderTransparent'
import Categories from 'screens/MainScreen/components/Categories'
// store
import { getFoodCategories } from 'store/foodCategories/thunks'
import { foodCategoriesSelector } from 'store/foodCategories/selectors'
import { AppDispatch } from 'store'
// services
import { useGetCurrentPosition } from 'services/geoLocation'
// constants
import { END_POSITION } from './constants'
// styles
import styles from './styles'

const MainScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.MainScreen>> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()

  const scrollView = useRef(null)

  const mainDrawer = useRef(null)

  const [isOnlyDelivery, setOnlyDelivery] = useState<boolean>(false)

  const [isLoading, setLoading] = useState<boolean>(false)

  const swipePositionY = useSharedValue(0)

  const scrollY = useSharedValue(0)

  const foodCategories = useSelector(foodCategoriesSelector)

  useGetCurrentPosition()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(getFoodCategories())
      setLoading(false)
    }
    fetchData()
  }, [setLoading, dispatch])

  const animateTo = useCallback(
    (position: number) => () => {
      swipePositionY.value = withTiming(position, { duration: 300 })
    },
    [swipePositionY],
  )

  const navigateToTruck = useCallback(() => {
    navigation.navigate(Routes.TruckScreen)
  }, [navigation])

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: { startY: number }) => {
      ctx.startY = swipePositionY.value
    },
    onActive: (event, ctx: { startY: number }) => {
      if (scrollY.value > 0) {
        return
      }
      const distance = ctx.startY + event.translationY
      swipePositionY.value = distance > 0 ? distance : 0
    },
    onEnd: (event) => {
      if (scrollY.value > 0) {
        return
      }
      if (event.translationY > 100 || event.velocityY > 200) {
        swipePositionY.value = withTiming(END_POSITION, { duration: 300 })
        return
      }
      swipePositionY.value = withTiming(0, { duration: 300 })
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = swipePositionY.value > 0 ? 16 : 0
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      transform: [
        {
          translateY: swipePositionY.value,
        },
      ],
    }
  })

  const swipeBarStyle = useAnimatedStyle(() => ({
    opacity: swipePositionY.value > 0 ? 1 : 0,
  }))

  const titleSwipeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(swipePositionY.value, [0, END_POSITION], [0, 1]),
  }))

  const onRegisterScroll = useAnimatedScrollHandler({
    onBeginDrag: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const animatedProps = useAnimatedProps(() => ({ scrollEnabled: swipePositionY.value < END_POSITION }))

  return (
    <>
      <HeaderWithLocation swipePositionY={swipePositionY} />

      <HeaderTransparent swipePositionY={swipePositionY} animateTo={animateTo} />

      <PanGestureHandler ref={mainDrawer} simultaneousHandlers={scrollView} onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Animated.View style={[styles.swipeBar, swipeBarStyle]} />
          <Animated.Text style={[styles.listTitle, titleSwipeStyle]}>Top Pick Restaurants</Animated.Text>

          <Categories swipePositionY={swipePositionY} data={foodCategories} />

          <SubNavigation
            swipePositionY={swipePositionY}
            isOnlyDelivery={isOnlyDelivery}
            onLocationPress={animateTo(END_POSITION)}
            onOnlyDeliveryPress={() => setOnlyDelivery(!isOnlyDelivery)}
          />

          <NativeViewGestureHandler ref={scrollView} simultaneousHandlers={mainDrawer}>
            <Animated.ScrollView
              animatedProps={animatedProps}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={onRegisterScroll}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <TruckCard onPress={navigateToTruck} />
              <TruckCard onPress={navigateToTruck} />
              <TruckCard onPress={navigateToTruck} />
              <TruckCard onPress={navigateToTruck} />
              <TruckCard onPress={navigateToTruck} />
              <TruckCard onPress={navigateToTruck} />
              <TruckCard onPress={navigateToTruck} />
            </Animated.ScrollView>
          </NativeViewGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      {isLoading && <Spinner />}
    </>
  )
}

export default memo(MainScreen)
