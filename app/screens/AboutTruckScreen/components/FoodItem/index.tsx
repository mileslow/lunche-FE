import React, { FC, memo } from 'react'
// libs
import { Image, View, ViewStyle, StyleSheet } from 'react-native'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import StringList from 'components/StringList'
// styles
import { Spacing } from 'styles'

interface IProps {
  style: ViewStyle
  item: { name: string; foodTypes: { name: string }[]; photo: string }
}

const FoodItem: FC<IProps> = ({ style, item }) => (
  <View style={style}>
    <Image style={styles.foodImage} source={{ uri: item.photo }} />
    <Typography variant={TypographyVariants.body} style={styles.title}>
      {item.name}
    </Typography>
    <StringList data={map(item.foodTypes, (i) => i.name)} />
  </View>
)

const styles = StyleSheet.create({
  foodImage: {
    borderRadius: 8,
    height: 140,
    marginBottom: Spacing.base,
    width: 140,
  },
  title: {
    marginBottom: Spacing.tiny,
  },
})

export default memo(FoodItem)
