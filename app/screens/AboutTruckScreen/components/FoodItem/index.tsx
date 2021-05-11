import React, { FC, memo } from 'react'
// libs
import { Image, ImageSourcePropType, View, ViewStyle, StyleSheet } from 'react-native'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import StringList from 'components/StringList'
// styles
import { Spacing } from 'styles'

interface IProps {
  style: ViewStyle
  item: { title: string; categories: string[]; image: ImageSourcePropType }
}

const FoodItem: FC<IProps> = ({ style, item }) => {
  return (
    <View style={style}>
      <Image style={styles.foodImage} source={item.image} />
      <Typography variant={TypographyVariants.body} style={styles.title}>
        {item.title}
      </Typography>
      <StringList data={item.categories} />
    </View>
  )
}

const styles = StyleSheet.create({
  foodImage: {
    height: 140,
    marginBottom: Spacing.base,
    width: 140,
  },
  title: {
    marginBottom: Spacing.tiny,
  },
})

export default memo(FoodItem)
