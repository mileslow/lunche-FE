import React, { memo, useRef } from 'react'
// libs
import { View, Text, Pressable, useWindowDimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedProps,
} from 'react-native-reanimated'
import { PanGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler'
// components
// assets
import PersonIcon from 'assets/svg/person.svg'
import SearchIcon from 'assets/svg/search.svg'
import ListIcon from 'assets/svg/list.svg'
import BackIcon from 'assets/svg/back.svg'
// styles
import styles from './styles'

const HEADER_HEIGHT = 56

const MainScreen = () => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const windowHeight = useWindowDimensions().height

  const scrollView = useRef(null)

  const mainDrawer = useRef(null)

  const y = useSharedValue(0)

  const scrollY = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: { startY: number }) => {
      ctx.startY = y.value
    },
    onActive: (event, ctx: { startY: number }) => {
      if (scrollY.value > 0) {
        return
      }
      const distance = ctx.startY + event.translationY
      y.value = distance > 0 ? distance : 0
    },
    onEnd: (event) => {
      if (scrollY.value > 0) {
        return
      }
      if (event.translationY > 100 || event.velocityY > 200) {
        y.value = withTiming(windowHeight / 2, { duration: 300 })
        return
      }
      y.value = withTiming(0, { duration: 300 })
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = y.value > 0 ? 16 : 0
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      transform: [
        {
          translateY: y.value,
        },
      ],
    }
  })

  const headerWithLocation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(y.value, [0, windowHeight / 2], [1, 0]),
    }
  })

  const transparentHeader = useAnimatedStyle(() => {
    return {
      opacity: interpolate(y.value, [0, windowHeight / 2], [0, 1]),
      zIndex: y.value > 0 ? 1 : -1,
    }
  })

  const swipeBarStyle = useAnimatedStyle(() => ({
    opacity: y.value > 0 ? 1 : 0,
  }))

  const runAnimation = () => {
    y.value = withTiming(windowHeight / 2, { duration: 300 })
  }

  const onRegisterScroll = useAnimatedScrollHandler({
    onBeginDrag: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const animatedProps = useAnimatedProps(() => {
    return {
      scrollEnabled: y.value < windowHeight / 2,
    }
  })

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          styles.headerWithLocation,
          headerWithLocation,
          { paddingTop: insets.top, minHeight: HEADER_HEIGHT + insets.top },
        ]}
      >
        <Text style={styles.headerText}>{t('mainScreen:headerText')}</Text>
        <View style={styles.currentLocationWrap}>
          <Text style={styles.currentLocation}>Los Angeles</Text>
          <Pressable onPress={runAnimation}>
            <PersonIcon />
          </Pressable>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.headerActions,
          transparentHeader,
          { paddingTop: insets.top, minHeight: HEADER_HEIGHT + insets.top },
        ]}
      >
        <Pressable style={[styles.headerIcon, styles.backButton]} onPress={() => console.log('BackIcon')}>
          <BackIcon />
        </Pressable>
        <View style={styles.leftNav}>
          <Pressable style={styles.headerIcon} onPress={() => console.log('ListIcon')}>
            <ListIcon />
          </Pressable>
          <Pressable style={styles.headerIcon} onPress={() => console.log('SearchIcon')}>
            <SearchIcon />
          </Pressable>
        </View>
      </Animated.View>
      <PanGestureHandler ref={mainDrawer} simultaneousHandlers={scrollView} onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Animated.View style={[styles.swipeBar, swipeBarStyle]} />
          <NativeViewGestureHandler ref={scrollView} simultaneousHandlers={mainDrawer}>
            <Animated.ScrollView
              animatedProps={animatedProps}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={onRegisterScroll}
            >
              <Text style={styles.listTitle}>Top Pick Restaurants</Text>
            </Animated.ScrollView>
          </NativeViewGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

export default memo(MainScreen)
