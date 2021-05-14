import React, { memo, ReactElement, forwardRef, ForwardedRef } from 'react'
// libs
import { ScrollView, Pressable, Text, View } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import map from 'lodash.map'
// styles
import styles from './styles'

interface ICategory {
  id: number
  name: string
  icon: string | ReactElement
}

interface IProps {
  data: ICategory[]
  onPress: (id: number) => void
}

const Category = ({ item, onPress }: { item: ICategory; onPress?: (id: number) => void }) => (
  <Pressable
    style={({ pressed }) => [styles.item, { opacity: pressed ? 0.6 : 1 }]}
    onPress={() => onPress && onPress(item.id)}
  >
    <View style={styles.icon}>
      {typeof item.icon === 'string' ? <SvgFromUri width={24} height={24} uri={item.icon} /> : item.icon}
    </View>
    <Text style={styles.itemLabel}>{item.name}</Text>
  </Pressable>
)

const Categories = forwardRef(({ data, onPress }: IProps, ref: ForwardedRef<ScrollView>) => {
  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      {map(data, (i, index) => (
        <Category key={index} item={i} onPress={onPress} />
      ))}
    </ScrollView>
  )
})

export default memo(Categories)
