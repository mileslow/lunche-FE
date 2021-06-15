import React, { FC, memo } from 'react'
// libs
import { StatusBar, StatusBarStyle, View } from 'react-native'
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
// components
import BackButton from 'components/Button/BackButton'
import Button, { ButtonTypes } from 'components/Button'
import HeartIcon from 'components/AnimatedSvgComponents/HeartIcon'
import EmptyHeartIcon from 'components/AnimatedSvgComponents/EmptyHeartIcon'
import ShareIcon from 'components/AnimatedSvgComponents/ShareIcon'
// selectors
import { isAuthorizedSelector } from 'store/auth/selectors'
// hooks
import useStatusBarStyle from 'hooks/useStatusBarStyle'
import useAnimatedHeader from 'hooks/useAnimatedHeader'
// styles
import styles from 'screens/TruckScreen/styles'
import { Colors, Spacing } from 'styles'

interface IProps {
  translationY: Animated.SharedValue<number>
  onFavoritePress: () => void
  isFavorite: boolean
}

const setBarStyle = (style: StatusBarStyle) => StatusBar.setBarStyle(style)

const Header: FC<IProps> = ({ translationY, onFavoritePress, isFavorite }) => {
  const insets = useSafeAreaInsets()

  const statusBarStyle = useStatusBarStyle('light-content')

  const { headerHeight, endAnimPosition } = useAnimatedHeader()

  const isAuthorized = useSelector(isAuthorizedSelector)

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

  const heartEmptyIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, endAnimPosition], [Colors.basic, Colors.midNightMoss]),
  }))

  const shareIconAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(translationY.value, [0, endAnimPosition], [Colors.basic, Colors.midNightMoss]),
  }))

  return (
    <Animated.View style={[styles.header, { paddingTop: insets.top, height: headerHeight }, headerStyle]}>
      <BackButton style={{ marginHorizontal: Spacing.base }} iconAnimatedProps={backIconAnimatedProps} />
      <View style={styles.rightNav}>
        {isAuthorized ? (
          <Button type={ButtonTypes.icon} onPress={onFavoritePress} style={{ marginHorizontal: Spacing.base }}>
            <HeartIcon
              style={styles.headerIcon}
              iconAnimatedProps={heartIconAnimatedProps}
              opacity={isFavorite ? 1 : 0}
            />
            <EmptyHeartIcon
              style={styles.headerIcon}
              iconAnimatedProps={heartEmptyIconAnimatedProps}
              opacity={isFavorite ? 0 : 1}
            />
          </Button>
        ) : null}
        <Button type={ButtonTypes.icon} onPress={() => null} style={{ marginHorizontal: Spacing.base }}>
          <ShareIcon iconAnimatedProps={shareIconAnimatedProps} />
        </Button>
      </View>
    </Animated.View>
  )
}

export default memo(Header)
