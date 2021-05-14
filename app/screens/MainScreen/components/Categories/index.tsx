import React, { memo, FC, forwardRef, ForwardedRef } from 'react'
// libs
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated'
// components
import CategoriesList from 'components/CategoriesList'
// constants
import { END_POSITION } from 'screens/MainScreen/constants'
import { FoodCategory } from 'store/foodCategories/types'
import { ScrollView } from 'react-native'

interface IProps {
  swipePositionY: Animated.SharedValue<number>
  data: FoodCategory[]
  onPress: (id: number) => void
}

const Categories: FC<IProps> = forwardRef(({ swipePositionY, data, onPress }, ref: ForwardedRef<ScrollView>) => {
  const categoriesAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(swipePositionY.value, [0, END_POSITION], [0, 48]) }],
    zIndex: 1,
  }))

  return (
    <Animated.View style={categoriesAnimStyle}>
      <CategoriesList ref={ref} data={data} onPress={onPress} />
    </Animated.View>
  )
})

export default memo(Categories)
