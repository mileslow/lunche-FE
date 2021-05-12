import React, { memo, FC, ReactElement } from 'react'
// libs
import { ScrollView, Pressable, Text, View } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import map from 'lodash.map'
// styles
import styles from './styles'

interface ICategory {
  name: string
  icon: string | ReactElement
}

interface IProps {
  data: ICategory[]
}

const Category = ({ item }: { item: ICategory }) => (
  <Pressable style={styles.item}>
    <View style={styles.icon}>
      {typeof item.icon === 'string' ? <SvgFromUri width={24} height={24} uri={item.icon} /> : item.icon}
    </View>
    <Text style={styles.itemLabel}>{item.name}</Text>
  </Pressable>
)

const Categories: FC<IProps> = ({ data }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      {map(data, (i, index) => (
        <Category key={index} item={i} />
      ))}
    </ScrollView>
  )
}

export default memo(Categories)
