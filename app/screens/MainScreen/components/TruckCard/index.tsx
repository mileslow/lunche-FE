import React, { FC, useMemo } from 'react'
import { Pressable, Image, Text } from 'react-native'
import map from 'lodash.map'
// components
import StringList from 'components/StringList'
import InfoWithIconList from 'components/InfoWithIconList'
// store
import { Truck } from 'store/trucks/types'
// hooks
import useTruckInfo from 'hooks/useTruckInfo'
// styles
import styles from './styles'

interface IProps {
  item: Truck
  onPress: () => void
}

const TrackCard: FC<IProps> = ({ onPress, item }) => {
  const info = useTruckInfo(item)

  const categories = useMemo(() => map(item.foodCategories, (i) => i.name), [item.foodCategories])

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image style={styles.mainImage} source={{ uri: item.mainPhoto }} />
      <Text style={styles.subhead}>{item.name}</Text>
      <StringList data={categories} style={styles.categories} />
      <InfoWithIconList data={info} style={styles.info} />
    </Pressable>
  )
}

export default TrackCard
