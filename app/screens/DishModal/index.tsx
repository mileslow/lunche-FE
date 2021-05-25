import React, { FC, memo, useCallback, useReducer, useRef, useState } from 'react'
// libs
import { Image, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Extrapolate,
} from 'react-native-reanimated'
import round from 'lodash.round'
// components
import Spinner from 'components/Spinner'
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import ItemCount from 'components/ItemCount'
import Divider from 'components/Divider'
// store
import { getTruckMenuItem } from 'store/trucks/thunks'
// services
import { getImageBySize } from 'services/utils'
// styles
import { Colors, Metrics } from 'styles'
import styles, { CLOSE_ICON_SIZE } from './styles'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { MenuItemResource } from 'store/trucks/types'
// types
import { Action, ActionType, LocalState } from './types'
import { StackScreenProps } from '@react-navigation/stack'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { useTranslation } from 'react-i18next'
import CloseIcon from 'assets/svg/close.svg'

const reducer = (state: LocalState, action: Action): LocalState => {
  switch (action.type) {
    case ActionType.SetLoading:
      return { ...state, isLoading: action.payload }
    case ActionType.GetMenuItemFulfilled:
      return { ...state, isLoading: false, dish: action.payload }
    case ActionType.IncrementCount:
      return { ...state, itemCount: state.itemCount + 1 }
    case ActionType.DecrementCount:
      return {
        ...state,
        itemCount: state.itemCount > initialState.itemCount ? state.itemCount - 1 : initialState.itemCount,
      }
    default:
      return state
  }
}

const initialState: LocalState = {
  isLoading: false,
  dish: {
    photo: '',
  } as MenuItemResource,
  itemCount: 1,
}

const DishModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.DishModal>> = ({ route, navigation }) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const dispatch = useDispatch<AppDispatch>()

  const [state, localDispatch] = useReducer(reducer, initialState)

  const mainDrawer = useRef()

  const scrollView = useRef()

  const masterdrawer = useRef()

  const TOP_PADDING = useRef(insets.top + Metrics.header)

  const [lastSnap, setLastSnap] = useState(TOP_PADDING.current)

  const swipePositionY = useSharedValue(TOP_PADDING.current)

  const beginDrag = useSharedValue(0)

  const stepPositions = useSharedValue([
    TOP_PADDING.current,
    Metrics.windowHeight * 0.2,
    Metrics.windowHeight * 0.4,
    Metrics.windowHeight * 0.6,
  ])

  useFocusEffect(
    useCallback(() => {
      const fetchMenuItem = async () => {
        localDispatch({ type: ActionType.SetLoading, payload: true })
        const result = await dispatch(getTruckMenuItem({ truckId: route.params.truckId, id: route.params.id }))
        if (getTruckMenuItem.fulfilled.match(result)) {
          localDispatch({ type: ActionType.GetMenuItemFulfilled, payload: result.payload })
        }
      }
      fetchMenuItem()
    }, [route, dispatch]),
  )

  const handleCloseModal = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: { startY: number }) => {
      ctx.startY = swipePositionY.value
    },
    onActive: (event, ctx: { startY: number; distance: number }) => {
      swipePositionY.value = ctx.startY + event.translationY - beginDrag.value
    },
    onEnd: (e, ctx: { startY: number }) => {
      const endOffsetY = ctx.startY + e.translationY - beginDrag.value + 0.05 * e.velocityY

      if (endOffsetY > stepPositions.value[stepPositions.value.length - 1]) {
        runOnJS(handleCloseModal)()
        return
      }

      let destSnapPoint = stepPositions.value[0]
      stepPositions.value.forEach((snapPoint) => {
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      })

      swipePositionY.value = withTiming(destSnapPoint, { duration: 300 })
      runOnJS(setLastSnap)(destSnapPoint)
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            swipePositionY.value,
            [stepPositions.value[0], stepPositions.value[stepPositions.value.length - 1]],
            [stepPositions.value[0], stepPositions.value[stepPositions.value.length - 1]],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })

  const onRegisterScroll = useAnimatedScrollHandler({
    onBeginDrag: (e) => {
      beginDrag.value = e.contentOffset.y
    },
  })

  const handleAddButton = useCallback(() => {
    handleCloseModal()
  }, [])

  const handlePresCounter = useCallback(
    (type: ActionType.IncrementCount | ActionType.DecrementCount) => () => {
      localDispatch({ type })
    },
    [],
  )

  return (
    <View style={styles.screen}>
      <TapGestureHandler maxDurationMs={100000} ref={masterdrawer} maxDeltaY={lastSnap - stepPositions.value[0]}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <PanGestureHandler
            ref={mainDrawer}
            simultaneousHandlers={[scrollView, masterdrawer]}
            onGestureEvent={gestureHandler}
            shouldCancelWhenOutside={false}
          >
            <Animated.View>
              <NativeViewGestureHandler ref={scrollView} waitFor={masterdrawer} simultaneousHandlers={mainDrawer}>
                <Animated.ScrollView
                  contentContainerStyle={{ paddingBottom: stepPositions.value[0] }}
                  bounces={false}
                  overScrollMode='never'
                  scrollEventThrottle={16}
                  onScroll={onRegisterScroll}
                  showsVerticalScrollIndicator={false}
                >
                  <TouchableOpacity containerStyle={styles.closeBtn} onPress={handleCloseModal}>
                    <CloseIcon width={CLOSE_ICON_SIZE} height={CLOSE_ICON_SIZE} />
                  </TouchableOpacity>
                  <Image
                    style={styles.mainImage}
                    source={{ uri: getImageBySize(state.dish.photo, Metrics.truckImgWidth, Metrics.truckImgHeight) }}
                  />
                  <View style={styles.info}>
                    <Typography variant={TypographyVariants.h3} style={styles.title}>
                      {state.dish.name}
                    </Typography>
                    <Typography variant={TypographyVariants.smallBody} color={Colors.gunsmoke} style={styles.desc}>
                      {state.dish.description}
                    </Typography>

                    <ItemCount
                      value={state.itemCount}
                      onPressMinus={handlePresCounter(ActionType.DecrementCount)}
                      onPressPlus={handlePresCounter(ActionType.IncrementCount)}
                    />
                  </View>
                </Animated.ScrollView>
              </NativeViewGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
      <View style={styles.buttonWrap}>
        <Divider />
        <Button
          type={ButtonTypes.primary}
          title={`${t('dishModal:addToOrderButton')} ($ ${round(state.dish.price * state.itemCount, 2)})`}
          style={styles.button}
          onPress={handleAddButton}
        />
      </View>
      {state.isLoading && <Spinner />}
    </View>
  )
}

export default memo(DishModal)
