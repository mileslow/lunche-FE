import React, { memo, useRef, useCallback, FC, useEffect, useMemo } from 'react'
// libs
import Animated from 'react-native-reanimated'
import { PanGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash.map'
import is from 'lodash.isequal'
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
import { currentPositionSelector } from 'store/general/selectors'
// types
import { AppDispatch } from 'store'
import { GetTrucksParams } from 'store/trucks/types'
// services
import { CurrentLocation, getCurrentLocation } from 'services/geoLocation'
// hooks
import useSwipeAnimation, { END_POSITION } from './useSwipeAnimation'
// styles
import styles from './styles'
// reducer
import { useMainScreenReducer, ActionType } from './reducer'

const MainScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.MainScreen>> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()

  const scrollView = useRef(null)

  const horizontalScrollView = useRef(null)

  const mainDrawer = useRef(null)

  const [state, localDispatch] = useMainScreenReducer()

  const foodCategories = useSelector(foodCategoriesSelector)

  const currentLocation = useSelector(currentPositionSelector)

  const isLocationLoaded = useRef<boolean>(false)

  const prevLocation = useRef<CurrentLocation | null>(null)

  const {
    animatedProps,
    onRegisterScroll,
    swipeBarStyle,
    titleSwipeStyle,
    animatedStyle,
    gestureHandler,
    animateTo,
    swipePositionY,
  } = useSwipeAnimation()

  const fetchTruck = useCallback(async (params: GetTrucksParams) => {
    localDispatch({ type: ActionType.FetchingTruckPending, payload: params })
    const resultTruck = await dispatch(getTrucks(params))
    if (getTrucks.fulfilled.match(resultTruck)) {
      localDispatch({ type: ActionType.FetchingTruckFullfilled, payload: resultTruck.payload.data })
    } else {
      localDispatch({ type: ActionType.SetLoadingTruck, payload: false })
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (isLocationLoaded.current && !is(currentLocation, prevLocation.current)) {
        prevLocation.current = currentLocation
        fetchTruck({ latitude: currentLocation?.lat, longitude: currentLocation?.lng })
      }
    }, [currentLocation]),
  )

  useEffect(() => {
    const fetchData = async () => {
      localDispatch({ type: ActionType.SetLoadingLocation, payload: true })
      const locationResult = await getCurrentLocation(true)
      isLocationLoaded.current = true
      dispatch(setCurrentPosition(locationResult))

      await dispatch(getFoodCategories())
      localDispatch({ type: ActionType.SetLoadingLocation, payload: false })
    }
    fetchData()
  }, [dispatch])

  const navigateToTruck = useCallback(
    (id) => {
      navigation.navigate(Routes.TruckScreen, { id })
    },
    [navigation],
  )

  const renderTrucks = useMemo(
    () =>
      map(state.trucks, (truck) => <TruckCard key={truck.id} onPress={() => navigateToTruck(truck.id)} item={truck} />),
    [state.trucks, navigateToTruck],
  )

  const onOnlyDeliveryPress = useCallback(
    () => fetchTruck({ ...state.filters, supportDelivery: !state.filters.supportDelivery }),
    [state.filters, fetchTruck],
  )

  const handleCategoryPress = useCallback(
    (categoryId) => {
      const foodCategoryIds = new Set(state.filters.foodCategoryIds)
      foodCategoryIds.has(categoryId) ? foodCategoryIds.delete(categoryId) : foodCategoryIds.add(categoryId)
      fetchTruck({ ...state.filters, foodCategoryIds: [...foodCategoryIds] })
    },
    [fetchTruck, state.filters],
  )

  const redirectToChangeAddress = useCallback(() => {
    navigation.navigate(Routes.ChangeAddressModal)
  }, [navigation])

  const redirectToSearch = useCallback(() => {
    navigation.navigate(Routes.SearchTruckModal)
  }, [navigation])

  return (
    <>
      <Map style={styles.map} zoomLevel={14} location={currentLocation || undefined} />

      <HeaderWithLocation
        swipePositionY={swipePositionY}
        address={currentLocation?.combinedAddress}
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
              active={state.filters.foodCategoryIds}
              swipePositionY={swipePositionY}
              data={foodCategories}
              onPress={handleCategoryPress}
            />
          </NativeViewGestureHandler>

          <SubNavigation
            swipePositionY={swipePositionY}
            isOnlyDelivery={!!state.filters.supportDelivery}
            onLocationPress={animateTo(END_POSITION)}
            onSearchPress={redirectToSearch}
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
      {(state.loading.isLoadingLocation || state.loading.isLoadingTruck) && <Spinner />}
    </>
  )
}

export default memo(MainScreen)
