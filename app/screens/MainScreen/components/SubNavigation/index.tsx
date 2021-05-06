import React, { memo, FC } from 'react'
// libs
import { Text, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
// components
import Checkbox from 'components/Checkbox'
import Button, { ButtonTypes } from 'components/Button'
// assets
import LocationIcon from 'assets/svg/location.svg'
import SearchIcon from 'assets/svg/search.svg'
// styles
import styles from './styles'
import { useTranslation } from 'react-i18next'

interface IProps {
  onLocationPress: () => void
  isOnlyDelivery: boolean
  onOnlyDeliveryPress: () => void
  swipePositionY: Animated.SharedValue<number>
}

const SubNavigation: FC<IProps> = ({ onLocationPress, isOnlyDelivery, onOnlyDeliveryPress, swipePositionY }) => {
  const { t } = useTranslation()

  const subNavigationStyle = useAnimatedStyle(() => ({
    opacity: swipePositionY.value <= 0 ? 1 : 0,
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
        <Checkbox checked={isOnlyDelivery} onPress={onOnlyDeliveryPress} />
        <Text style={styles.onlyLabel}>{t('mainScreen:onlyDelivery')}</Text>
      </View>
    </Animated.View>
  )
}

export default memo(SubNavigation)
