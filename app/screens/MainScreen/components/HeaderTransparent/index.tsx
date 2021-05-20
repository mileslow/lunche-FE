import React, { FC, memo } from 'react'
// libs
import { View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// components
import Button, { ButtonTypes } from 'components/Button'
// constants
import { END_POSITION } from 'screens/MainScreen/constants'
// assets
import BackIcon from 'assets/svg/back.svg'
import ListIcon from 'assets/svg/list.svg'
import SearchIcon from 'assets/svg/search.svg'
// styles
import { Metrics } from 'styles'
import styles from './styles'

interface IProps {
  swipePositionY: Animated.SharedValue<number>
  animateTo: (position: number) => () => void
}

const HeaderTransparent: FC<IProps> = ({ swipePositionY, animateTo }) => {
  const insets = useSafeAreaInsets()

  const transparentHeader = useAnimatedStyle(() => ({
    opacity: interpolate(swipePositionY.value, [0, END_POSITION], [0, 1]),
    zIndex: swipePositionY.value > 0 ? 1 : -1,
  }))

  return (
    <Animated.View
      style={[
        styles.headerActions,
        transparentHeader,
        { paddingTop: insets.top, minHeight: Metrics.header + insets.top },
      ]}
    >
      <Button style={[styles.headerIcon, styles.backButton]} onPress={animateTo(0)}>
        <BackIcon />
      </Button>
      <View style={styles.leftNav}>
        <Button type={ButtonTypes.icon} style={styles.headerIcon} onPress={animateTo(0)}>
          <ListIcon />
        </Button>
        <Button type={ButtonTypes.icon} style={styles.headerIcon} onPress={() => console.log('SearchIcon')}>
          <SearchIcon />
        </Button>
      </View>
    </Animated.View>
  )
}

export default memo(HeaderTransparent)
