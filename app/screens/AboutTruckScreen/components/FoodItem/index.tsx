import React, { FC, memo } from 'react'
// libs
import { Image, View, ViewStyle, StyleSheet } from 'react-native'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import StringList from 'components/StringList'
// services
import { getImageBySize } from 'services/utils'
// styles
import { Spacing, Metrics } from 'styles'

interface IProps {
  style: ViewStyle
  item: { name: string; foodTypes: { name: string }[]; photo: string }
}

const FoodItem: FC<IProps> = ({ style, item }) => (
  <View style={style}>
    <Image
      style={styles.foodImage}
      source={{ uri: getImageBySize(item.photo, Metrics.foodItemSize, Metrics.foodItemSize) }}
    />
    <Typography variant={TypographyVariants.body} style={styles.title}>
      {item.name}
    </Typography>
    <StringList data={map(item.foodTypes, (i) => i.name)} />
  </View>
)

const styles = StyleSheet.create({
  foodImage: {
    borderRadius: 8,
    height: Metrics.foodItemSize,
    marginBottom: Spacing.base,
    width: Metrics.foodItemSize,
  },
  title: {
    marginBottom: Spacing.tiny,
  },
})

export default memo(FoodItem)
