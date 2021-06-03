import React, { FC, memo } from 'react'
// libs
import { Image, StyleSheet, ViewStyle } from 'react-native'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Button, { ButtonTypes } from 'components/Button'
import StringList from 'components/StringList'
// services
import { getImageBySize } from 'services/utils'
// styles
import { Metrics, Spacing } from 'styles'

interface IProps {
  style: ViewStyle
  item: { name: string; foodTypes: { name: string }[]; photo: string }
  onPress: () => void
}

const FoodItem: FC<IProps> = ({ style, item, onPress }) => (
  <Button type={ButtonTypes.link} style={style} onPress={onPress}>
    <Image
      style={styles.foodImage}
      source={{ uri: getImageBySize(item.photo, Metrics.foodItemSize, Metrics.foodItemSize), cache: 'force-cache' }}
    />
    <Typography variant={TypographyVariants.body} style={styles.title}>
      {item.name}
    </Typography>
    <StringList data={map(item.foodTypes, (i) => i.name)} />
  </Button>
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
