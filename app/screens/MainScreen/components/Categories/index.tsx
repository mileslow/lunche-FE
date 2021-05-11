import React, { memo, FC } from 'react'
// libs
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated'
// components
import CategoriesList from 'components/CategoriesList'
// assets
import ChickenIcon from 'assets/svg/chicken.svg'
// constants
import { END_POSITION } from 'screens/MainScreen/constants'

const DATA = [
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
]

interface IProps {
  swipePositionY: Animated.SharedValue<number>
}

const Categories: FC<IProps> = ({ swipePositionY }) => {
  const categoriesAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(swipePositionY.value, [0, END_POSITION], [0, 48]) }],
    zIndex: 1,
  }))

  return (
    <Animated.View style={categoriesAnimStyle}>
      <CategoriesList data={DATA} />
    </Animated.View>
  )
}

export default memo(Categories)
