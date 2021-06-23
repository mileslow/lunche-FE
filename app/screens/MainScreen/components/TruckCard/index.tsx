import React, { FC, useMemo, memo } from 'react'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import map from 'lodash.map'
// components
import StringList from 'components/StringList'
import InfoWithIconList from 'components/InfoWithIconList'
import Card from 'components/Card'
// store
import { Truck } from 'store/trucks/types'
// hooks
import useTruckInfo from 'hooks/useTruckInfo'
// services
import { getImageBySize } from 'services/utils'
// assets
import HeartIcon from 'assets/svg/heart.svg'
// styles
import { Colors, Metrics } from 'styles'
import styles from './styles'
import Typography, { TypographyVariants } from 'components/Typography'

interface IProps {
  item: Truck
  onPress: () => void
  onFavoritePress?: () => void
}

const TrackCard: FC<IProps> = ({ onPress, item, onFavoritePress }) => {
  const info = useTruckInfo(item)

  const categories = useMemo(() => map(item.foodCategories, (i) => i.name), [item.foodCategories])

  return (
    <Card style={styles.card} onPress={onPress}>
      <Image
        style={styles.mainImage}
        source={{
          uri: getImageBySize(item.mainPhoto, Metrics.truckListImgWidth, Metrics.truckListImgHeight),
          cache: 'force-cache',
        }}
      />
      <View style={styles.nameBlock}>
        <Typography variant={TypographyVariants.subhead} style={styles.subhead}>
          {item.name}
        </Typography>
        {onFavoritePress ? (
          <TouchableOpacity style={styles.likeBtn} onPress={onFavoritePress}>
            <HeartIcon fill={Colors.midNightMoss} />
          </TouchableOpacity>
        ) : null}
      </View>
      <StringList data={categories} style={styles.categories} />
      <InfoWithIconList data={info} style={styles.info} />
    </Card>
  )
}

export default memo(TrackCard)
