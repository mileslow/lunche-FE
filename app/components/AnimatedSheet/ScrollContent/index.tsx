import React, { FC, ReactNode, memo } from 'react'
import Animated from 'react-native-reanimated'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import { StyleProp, ViewStyle } from 'react-native'
import { IAnimatedScrollProps } from '../types'

const ScrollContent: FC<
  IAnimatedScrollProps & {
    children: ReactNode
    style?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
  }
> = ({ scrollViewRef, waitFor, simultaneousHandlers, children, onRegisterScroll, style, contentContainerStyle }) => (
  <NativeViewGestureHandler ref={scrollViewRef} waitFor={waitFor} simultaneousHandlers={simultaneousHandlers}>
    <Animated.ScrollView
      style={style}
      bounces={false}
      overScrollMode='never'
      scrollEventThrottle={16}
      onScroll={onRegisterScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </Animated.ScrollView>
  </NativeViewGestureHandler>
)

export default memo(ScrollContent)
