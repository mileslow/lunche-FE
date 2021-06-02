import React, { FC, memo } from 'react'
import styles from 'screens/TruckScreen/styles'
import { Colors, Spacing } from 'styles'
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
import useAnimatedHeader from 'hooks/useAnimatedHeader'

interface IProps {
  translationY: Animated.SharedValue<number>
}

const setBarStyle = (style: StatusBarStyle) => StatusBar.setBarStyle(style)

const Header: FC<IProps> = ({ translationY }) => {
  const insets = useSafeAreaInsets()

  const statusBarStyle = useStatusBarStyle('light-content')

  const { headerHeight, endAnimPosition } = useAnimatedHeader()

  useDerivedValue(() => {
    if (statusBarStyle.value !== 'dark-content' && translationY.value >= endAnimPosition) {
      runOnJS(setBarStyle)('dark-content')
      statusBarStyle.value = 'dark-content'
      return
    }

    if (statusBarStyle.value !== 'light-content' && translationY.value < endAnimPosition) {
      runOnJS(setBarStyle)('light-content')
      statusBarStyle.value = 'light-content'
      return
    }
  }, [])

  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(translationY.value, [0, endAnimPosition], [Colors.transparent, Colors.basic]),
  }))

  const backIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, endAnimPosition], [Colors.basic, Colors.midNightMoss]),
  }))

  const heartIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, endAnimPosition], [Colors.basic, Colors.midNightMoss]),
  }))

  const shareIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, endAnimPosition], [Colors.basic, Colors.midNightMoss]),
  }))

  return (
    <Animated.View
      pointerEvents='box-none'
      style={[styles.header, { paddingTop: insets.top, height: headerHeight }, headerStyle]}
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
