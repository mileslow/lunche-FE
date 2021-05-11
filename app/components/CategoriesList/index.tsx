import React, { memo, FC } from 'react'
// libs
import { ScrollView, Pressable, Text } from 'react-native'
import map from 'lodash.map'
// styles
import styles from './styles'

const Category = ({ item }: any) => (
  <Pressable style={styles.item}>
    {item.icon}
    <Text style={styles.itemLabel}>{item.label}</Text>
  </Pressable>
)

interface IProps {
  data: any
}

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
