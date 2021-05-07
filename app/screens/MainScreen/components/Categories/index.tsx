import React, { memo, FC } from 'react'
// libs
import { ScrollView, Pressable, Text } from 'react-native'
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated'
import map from 'lodash.map'
// assets
import ChickenIcon from 'assets/svg/chicken.svg'
// constants
import { END_POSITION } from 'screens/MainScreen/constants'
// styles
import styles from './styles'

const DATA = [
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
  { icon: <ChickenIcon width={24} height={24} />, label: 'Chicken' },
]

const Category = ({ item }: any) => (
  <Pressable style={styles.item}>
    {item.icon}
    <Text style={styles.itemLabel}>{item.label}</Text>
  </Pressable>
)

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {map(DATA, (i, index) => (
          <Category key={index} item={i} />
        ))}
      </ScrollView>
    </Animated.View>
  )
}

export default memo(Categories)
