import React, { memo, FC } from 'react'
// libs
import { Text, View } from 'react-native'
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
// components
import Checkbox from 'components/Checkbox'
import Button, { ButtonTypes } from 'components/Button'
// assets
import LocationIcon from 'assets/svg/location.svg'
import SearchIcon from 'assets/svg/search.svg'
// constants
import { END_POSITION } from 'screens/MainScreen/constants'
// styles
import styles from './styles'

interface IProps {
  onLocationPress: () => void
  isOnlyDelivery: boolean
  onOnlyDeliveryPress: () => void
  swipePositionY: Animated.SharedValue<number>
}

const SubNavigation: FC<IProps> = ({ onLocationPress, isOnlyDelivery, onOnlyDeliveryPress, swipePositionY }) => {
  const { t } = useTranslation()

  const subNavigationStyle = useAnimatedStyle(() => ({
    opacity: interpolate(swipePositionY.value, [0, END_POSITION], [1, 0]),
  }))

  return (
    <Animated.View style={[styles.subNavigation, subNavigationStyle]}>
      <View style={styles.subNavigationBlock}>
        <Button type={ButtonTypes.icon} style={styles.subNavigationAction} onPress={onLocationPress}>
          <LocationIcon />
        </Button>
        <Button type={ButtonTypes.icon} style={styles.subNavigationAction} onPress={() => null}>
          <SearchIcon />
        </Button>
      </View>
      <View style={styles.subNavigationBlock}>
        <Checkbox checked={isOnlyDelivery} onPress={onOnlyDeliveryPress} type='radio' />
        <Text style={styles.onlyLabel}>{t('mainScreen:onlyDelivery')}</Text>
      </View>
    </Animated.View>
  )
}

export default memo(SubNavigation)
