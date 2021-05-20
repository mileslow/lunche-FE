import React, { FC, useMemo, memo } from 'react'
import styles, { TRUCK_IMAGE_HEIGHT } from 'screens/TruckScreen/styles'
import { Colors, Spacing, Metrics } from 'styles'
import BackButton from 'components/Button/BackButton'
import { StatusBar, StatusBarStyle, View } from 'react-native'
import Button, { ButtonTypes } from 'components/Button'
import HeartIcon from 'components/AnimatedSvgComponents/HeartIcon'
import ShareIcon from 'components/AnimatedSvgComponents/ShareIcon'
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useStatusBarStyle from 'hooks/useStatusBarStyle'

interface IProps {
  translationY: Animated.SharedValue<number>
}

const setBarStyle = (style: StatusBarStyle) => StatusBar.setBarStyle(style)

const Header: FC<IProps> = ({ translationY }) => {
  const insets = useSafeAreaInsets()

  const statusBarStyle = useStatusBarStyle('light-content')

  const HEADER_HEIGHT = useMemo(() => Metrics.header + insets.top, [insets])

  const END_ANIM_POSITION = useMemo(() => TRUCK_IMAGE_HEIGHT - HEADER_HEIGHT, [HEADER_HEIGHT])

  useDerivedValue(() => {
    if (statusBarStyle.value !== 'dark-content' && translationY.value >= END_ANIM_POSITION) {
      runOnJS(setBarStyle)('dark-content')
      statusBarStyle.value = 'dark-content'
      return
    }

    if (statusBarStyle.value !== 'light-content' && translationY.value < END_ANIM_POSITION) {
      runOnJS(setBarStyle)('light-content')
      statusBarStyle.value = 'light-content'
      return
    }
  }, [])

  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.transparent, Colors.basic]),
  }))

  const backIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.basic, Colors.midNightMoss]),
  }))

  const heartIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.basic, Colors.midNightMoss]),
  }))

  const shareIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, END_ANIM_POSITION], [Colors.basic, Colors.midNightMoss]),
  }))

  return (
    <Animated.View
      pointerEvents='box-none'
      style={[styles.header, { paddingTop: insets.top, minHeight: HEADER_HEIGHT }, headerStyle]}
    >
      <BackButton style={{ marginHorizontal: Spacing.base }} iconAnimatedProps={backIconAnimatedProps} />
      <View style={styles.rightNav}>
        <Button type={ButtonTypes.icon} onPress={() => null} style={{ marginHorizontal: Spacing.base }}>
          <HeartIcon iconAnimatedProps={heartIconAnimatedProps} />
        </Button>
        <Button type={ButtonTypes.icon} onPress={() => null} style={{ marginHorizontal: Spacing.base }}>
          <ShareIcon iconAnimatedProps={shareIconAnimatedProps} />
        </Button>
      </View>
    </Animated.View>
  )
}

export default memo(Header)
