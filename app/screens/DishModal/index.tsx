import React, { FC, memo, useCallback, useEffect, useReducer, useRef, useState } from 'react'
// libs
import { Image, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { NativeViewGestureHandler, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import round from 'lodash.round'
// components
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import ItemCount from 'components/ItemCount'
import ScreenContainer from 'components/ScreenContainer'
import ActionBottomBlock from 'components/ActionBottomBlock'
// store
import { getTruckMenuItem } from 'store/trucks/thunks'
import { orderItemSelector } from 'store/orders/selectors'
import { addItemToOrder } from 'store/orders/model'
// services
import { getImageBySize } from 'services/utils'
// styles
import { Colors, Metrics } from 'styles'
import styles, { CLOSE_ICON_SIZE } from './styles'
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
    case ActionType.SetInitialCount:
      return { ...state, itemCount: action.payload }
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

  const orderItem = useSelector(orderItemSelector(route.params.id))

  const [state, localDispatch] = useReducer(reducer, initialState)

  const mainDrawer = useRef()

  const scrollView = useRef()

  const masterdrawer = useRef()

  const TOP_PADDING = useRef(insets.top + Metrics.header)

  const [lastSnap, setLastSnap] = useState(TOP_PADDING.current)

  const swipePositionY = useSharedValue(Metrics.windowHeight)

  const beginDrag = useSharedValue(0)

  const stepPositions = useSharedValue([TOP_PADDING.current, Metrics.windowHeight * 0.6])

  useFocusEffect(
    useCallback(() => {
      const fetchMenuItem = async () => {
        localDispatch({ type: ActionType.SetLoading, payload: true })
        const result = await dispatch(getTruckMenuItem({ truckId: route.params.truckId, id: route.params.id }))
        if (getTruckMenuItem.fulfilled.match(result)) {
          localDispatch({ type: ActionType.GetMenuItemFulfilled, payload: result.payload })
        }
      }
      if (orderItem) {
        localDispatch({ type: ActionType.SetInitialCount, payload: orderItem.itemCount })
      }
      fetchMenuItem()
    }, [route, dispatch]),
  )

  useEffect(() => {
    swipePositionY.value = withTiming(TOP_PADDING.current, { duration: 700 })
  }, [])

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
      if (endOffsetY > stepPositions.value[stepPositions.value.length - 1] || e.velocityY > 2000) {
        swipePositionY.value = withTiming(
          Metrics.windowHeight,
          { duration: 700 },
          (isFinished) => isFinished && runOnJS(handleCloseModal)(),
        )
        return
      }

      swipePositionY.value = withTiming(endOffsetY, { duration: 300 })
      runOnJS(setLastSnap)(endOffsetY)
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            swipePositionY.value,
            [stepPositions.value[0], Metrics.windowHeight],
            [stepPositions.value[0], Metrics.windowHeight],
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
    dispatch(
      addItemToOrder({
        menuItemId: route.params.id,
        itemCount: state.itemCount,
        name: state.dish.name,
        price: state.dish.price,
      }),
    )
    handleCloseModal()
  }, [dispatch, handleCloseModal, route, state])

  const handlePresCounter = useCallback(
    (type: ActionType.IncrementCount | ActionType.DecrementCount) => () => {
      localDispatch({ type })
    },
    [],
  )

  return (
    <ScreenContainer style={styles.screen} isLoading={state.isLoading}>
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
                  <Button type={ButtonTypes.icon} style={styles.closeBtn} onPress={handleCloseModal}>
                    <CloseIcon width={CLOSE_ICON_SIZE} height={CLOSE_ICON_SIZE} />
                  </Button>
                  <Image
                    style={styles.mainImage}
                    source={{
                      uri: getImageBySize(state.dish.photo, Metrics.truckImgWidth, Metrics.truckImgHeight),
                      cache: 'force-cache',
                    }}
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
      <ActionBottomBlock
        style={styles.buttonWrap}
        textButton={`${t('dishModal:addToOrderButton')} ($ ${
          state.isLoading ? '' : round(state.dish.price * state.itemCount, 2)
        })`}
        onPress={handleAddButton}
      />
    </ScreenContainer>
  )
}

export default memo(DishModal)
