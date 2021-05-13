import React, { memo, FC, ReactElement } from 'react'
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
  onPress?: (id: number) => void
}

const Category = ({ item, onPress }: { item: ICategory; onPress?: (id: number) => void }) => (
  <Pressable style={styles.item} onPress={() => onPress && onPress(item.id)}>
    <View style={styles.icon}>
      {typeof item.icon === 'string' ? <SvgFromUri width={24} height={24} uri={item.icon} /> : item.icon}
    </View>
    <Text style={styles.itemLabel}>{item.name}</Text>
  </Pressable>
)

const Categories: FC<IProps> = ({ data, onPress }) => {
  return (
    <ScrollView
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
}

export default memo(Categories)
