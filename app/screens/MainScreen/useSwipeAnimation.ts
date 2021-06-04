import { useCallback } from 'react'
import {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Metrics } from 'styles'

export const END_POSITION = Metrics.windowHeight / 2

const useSwipeAnimation = () => {
  const swipePositionY = useSharedValue(0)

  const scrollActive = useSharedValue(false)

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
      if (event.translationY > 100 || event.velocityY > 1500) {
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

  const animateTo = useCallback(
    (position: number) => () => {
      swipePositionY.value = withTiming(position, { duration: 300 })
    },
    [swipePositionY],
  )

  return {
    animatedProps,
    onRegisterScroll,
    swipeBarStyle,
    titleSwipeStyle,
    animatedStyle,
    gestureHandler,
    animateTo,
    swipePositionY,
    scrollActive,
  }
}

export default useSwipeAnimation
