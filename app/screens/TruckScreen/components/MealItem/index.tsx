import React, { FC, memo } from 'react'
import { Image, View } from 'react-native'
import Typography, { TypographyVariants } from 'components/Typography'
// assets
import DiscountIcon from 'assets/svg/discount.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'

interface IProps {
  withDiscount?: boolean
  item: {
    name: string
    photo: string
    description: string
    price: number
  }
}

const MealItem: FC<IProps> = ({ withDiscount, item }) => (
  <View style={styles.meal}>
    <Image style={styles.mealImg} source={{ uri: item.photo }} />
    <View style={styles.mealInfo}>
      <View>
        <Typography style={styles.mealName} variant={TypographyVariants.body}>
          {item.name}
        </Typography>
        <Typography variant={TypographyVariants.smallBody} color={Colors.gunsmoke}>
          {item.description}
        </Typography>
        {withDiscount && <DiscountIcon style={styles.discountIcon} />}
      </View>
      <View style={styles.priceInfo}>
        <Typography
          color={Colors.midNightMoss}
          style={withDiscount && styles.throughPrice}
          variant={TypographyVariants.smallBody}
        >
          {item.price} $
        </Typography>
        {withDiscount && (
          <Typography style={styles.discountPrice} variant={TypographyVariants.smallBody}>
            {item.price} $
          </Typography>
        )}
      </View>
    </View>
  </View>
)

export default memo(MealItem)
