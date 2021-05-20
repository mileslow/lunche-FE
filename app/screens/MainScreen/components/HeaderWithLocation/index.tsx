import React, { memo, FC } from 'react'
// libs
import { Text, View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
// constants
import { END_POSITION } from 'screens/MainScreen/constants'
// assets
import PersonIcon from 'assets/svg/person.svg'
// styles
import { Metrics } from 'styles'
import styles from './styles'

interface IProps {
  swipePositionY: Animated.SharedValue<number>
  address?: string
}

const HeaderWithLocation: FC<IProps> = ({ swipePositionY, address }) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const headerWithLocation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(swipePositionY.value, [0, END_POSITION], [1, 0]),
    }
  })

  return (
    <Animated.View
      style={[styles.header, headerWithLocation, { paddingTop: insets.top, minHeight: Metrics.header + insets.top }]}
    >
      <Text style={styles.headerText}>{t('mainScreen:headerText')}</Text>
      <View style={styles.currentLocationWrap}>
        <Text style={styles.currentLocation}>{address || 'Los Angeles'}</Text>
        <PersonIcon />
      </View>
    </Animated.View>
  )
}

export default memo(HeaderWithLocation)
