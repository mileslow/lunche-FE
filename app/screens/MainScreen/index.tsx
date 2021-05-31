import React, { memo, useRef, useState, useCallback, FC, useEffect, useMemo } from 'react'
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
import allSettled from 'promise.allsettled'
import map from 'lodash.map'
// components
import Spinner from 'components/Spinner'
import Map from 'components/Map'
import TruckCard from 'screens/MainScreen/components/TruckCard'
import SubNavigation from 'screens/MainScreen/components/SubNavigation'
import HeaderWithLocation from 'screens/MainScreen/components/HeaderWithLocation'
import HeaderTransparent from 'screens/MainScreen/components/HeaderTransparent'
import Categories from 'screens/MainScreen/components/Categories'
// thunks
import { getFoodCategories } from 'store/foodCategories/thunks'
import { getTrucks } from 'store/trucks/thunks'
// store actions
import { setCurrentPosition } from 'store/general/model'
// selectors
import { foodCategoriesSelector } from 'store/foodCategories/selectors'
import { trucksSelector, filtersSelector } from 'store/trucks/selectors'
import { currentPositionSelector } from 'store/general/selectors'
import { AppDispatch } from 'store'
// services
import { getCurrentLocation } from 'services/geoLocation'
// constants
import { END_POSITION } from './constants'
// styles
import styles from './styles'

const MainScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.MainScreen>> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()

  const scrollView = useRef(null)

  const horizontalScrollView = useRef(null)

  const mainDrawer = useRef(null)

  const [isOnlyDelivery, setOnlyDelivery] = useState<boolean>(false)

  const [isLoading, setLoading] = useState<boolean>(false)

  const swipePositionY = useSharedValue(0)

  const scrollActive = useSharedValue(false)

  const foodCategories = useSelector(foodCategoriesSelector)

  const trucks = useSelector(trucksSelector)

  const filters = useSelector(filtersSelector)

  const currentLocation = useSelector(currentPositionSelector)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const locationResult = await getCurrentLocation(true)
      dispatch(setCurrentPosition(locationResult))
      const position = locationResult ? { latitude: locationResult.lat, longitude: locationResult.lng } : {}
      await allSettled([dispatch(getFoodCategories()), dispatch(getTrucks(position))])
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

  const navigateToTruck = useCallback(
    (id) => {
      navigation.navigate(Routes.TruckScreen, { id })
    },
    [navigation],
  )

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: { startY: number }) => {
      ctx.startY = swipePositionY.value
    },
    onActive: (event, ctx: { startY: number }) => {
      if (scrollActive.value) {
        return
      }
      const distance = ctx.startY + event.translationY
      swipePositionY.value = distance > 0 ? distance : 0
    },
    onEnd: (event) => {
      if (scrollActive.value) {
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
      scrollActive.value = e.contentOffset.y > 0 && true
    },
    onEndDrag: () => {
      scrollActive.value = false
    },
    onMomentumEnd: () => {
      scrollActive.value = false
    },
  })

  const animatedProps = useAnimatedProps(() => ({ scrollEnabled: swipePositionY.value < END_POSITION }))

  const renderTrucks = useMemo(
    () => map(trucks, (truck) => <TruckCard key={truck.id} onPress={() => navigateToTruck(truck.id)} item={truck} />),
    [trucks, navigateToTruck],
  )

  const onOnlyDeliveryPress = useCallback(async () => {
    setOnlyDelivery(!isOnlyDelivery)
    setLoading(true)
    await dispatch(getTrucks({ ...filters, supportDelivery: !isOnlyDelivery }))
    setLoading(false)
  }, [setOnlyDelivery, setLoading, dispatch, isOnlyDelivery, filters])

  const handleCategoryPress = useCallback(
    async (categoryId) => {
      setLoading(true)
      const foodCategoryIds = new Set(filters.foodCategoryIds)
      foodCategoryIds.has(categoryId) ? foodCategoryIds.delete(categoryId) : foodCategoryIds.add(categoryId)
      await dispatch(getTrucks({ ...filters, foodCategoryIds: [...foodCategoryIds] }))
      setLoading(false)
    },
    [setLoading, dispatch, filters],
  )

  const redirectToChangeAddress = useCallback(() => {
    navigation.navigate(Routes.ChangeAddressModal)
  }, [navigation])

  return (
    <>
      <Map style={styles.map} zoomLevel={14} location={currentLocation || undefined} />

      <HeaderWithLocation
        swipePositionY={swipePositionY}
        address={currentLocation?.address}
        onLocationPress={redirectToChangeAddress}
      />

      <HeaderTransparent swipePositionY={swipePositionY} animateTo={animateTo} />

      <PanGestureHandler
        ref={mainDrawer}
        simultaneousHandlers={[scrollView, horizontalScrollView]}
        onGestureEvent={gestureHandler}
      >
        <Animated.View style={[styles.box, animatedStyle]}>
          <Animated.View style={[styles.swipeBar, swipeBarStyle]} />
          <Animated.Text style={[styles.listTitle, titleSwipeStyle]}>Top Pick Restaurants</Animated.Text>

          <NativeViewGestureHandler ref={horizontalScrollView} simultaneousHandlers={mainDrawer}>
            <Categories
              active={filters.foodCategoryIds}
              swipePositionY={swipePositionY}
              data={foodCategories}
              onPress={handleCategoryPress}
            />
          </NativeViewGestureHandler>

          <SubNavigation
            swipePositionY={swipePositionY}
            isOnlyDelivery={isOnlyDelivery}
            onLocationPress={animateTo(END_POSITION)}
            onOnlyDeliveryPress={onOnlyDeliveryPress}
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
              {renderTrucks}
            </Animated.ScrollView>
          </NativeViewGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      {isLoading && <Spinner />}
    </>
  )
}

export default memo(MainScreen)
