import React, { FC, useMemo } from 'react'
import { Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import map from 'lodash.map'
// components
import StringList from 'components/StringList'
import InfoWithIconList from 'components/InfoWithIconList'
// store
import { Truck } from 'store/trucks/types'
// hooks
import useTruckInfo from 'hooks/useTruckInfo'
// services
import { getImageBySize } from 'services/utils'
// styles
import { Metrics } from 'styles'
import styles from './styles'

interface IProps {
  item: Truck
  onPress: () => void
}

const TrackCard: FC<IProps> = ({ onPress, item }) => {
  const info = useTruckInfo(item)

  const categories = useMemo(() => map(item.foodCategories, (i) => i.name), [item.foodCategories])

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.mainImage}
        source={{ uri: getImageBySize(item.mainPhoto, Metrics.truckListImgWidth, Metrics.truckListImgHeight) }}
      />
      <Text style={styles.subhead}>{item.name}</Text>
      <StringList data={categories} style={styles.categories} />
      <InfoWithIconList data={info} style={styles.info} />
    </TouchableOpacity>
  )
}

export default TrackCard
