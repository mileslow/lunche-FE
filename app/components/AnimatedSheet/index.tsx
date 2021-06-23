import React, { FC, memo, ReactNode, useRef, useState } from 'react'
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
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
// styles
import { Metrics } from 'styles'
import styles from './styles'
import { IAnimatedScrollProps } from 'components/AnimatedSheet/types'

interface IProps {
  children: (props: IAnimatedScrollProps) => ReactNode
  topPosition: number
  endPosition: number
}

const AnimatedSheet: FC<IProps> = ({ children, topPosition, endPosition }) => {
  const masterDrawer = useRef()

  const mainDrawer = useRef()

  const scrollView = useRef()

  const [lastSnap, setLastSnap] = useState(endPosition)

  const swipePositionY = useSharedValue(endPosition)

  const beginDrag = useSharedValue(0)

  const middlePositions = useSharedValue([Metrics.windowHeight * 0.6])

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: { startY: number }) => {
      ctx.startY = swipePositionY.value
    },
    onActive: (event, ctx: { startY: number; distance: number }) => {
      swipePositionY.value = ctx.startY + event.translationY - beginDrag.value
    },
    onEnd: (e, ctx: { startY: number }) => {
      const endOffsetY = ctx.startY + e.translationY - beginDrag.value + 0.05 * e.velocityY
      if ((e.translationY > 0 && endOffsetY > middlePositions.value[0]) || e.velocityY > 2000) {
        swipePositionY.value = withTiming(endPosition, { duration: 700 })
        runOnJS(setLastSnap)(endPosition)
        return
      }

      if ((e.translationY < 0 && endOffsetY < middlePositions.value[0]) || e.velocityY > 2000) {
        swipePositionY.value = withTiming(topPosition, { duration: 700 })
        runOnJS(setLastSnap)(topPosition)
        return
      }

      if (endOffsetY > topPosition) {
        swipePositionY.value = withTiming(endOffsetY, { duration: 300 })
        runOnJS(setLastSnap)(endOffsetY)
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            swipePositionY.value,
            [topPosition, endPosition],
            [topPosition, endPosition],
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

  return (
    <TapGestureHandler maxDurationMs={100000} ref={masterDrawer} maxDeltaY={lastSnap - topPosition}>
      <Animated.View style={[styles.card, { height: Metrics.windowHeight - topPosition }, animatedStyle]}>
        <PanGestureHandler
          ref={mainDrawer}
          simultaneousHandlers={[scrollView, masterDrawer]}
          onGestureEvent={gestureHandler}
          shouldCancelWhenOutside={false}
        >
          <Animated.View style={styles.fullFlex}>
            {children({
              scrollViewRef: scrollView,
              onRegisterScroll,
              waitFor: masterDrawer,
              simultaneousHandlers: mainDrawer,
            })}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}

export default memo(AnimatedSheet)
