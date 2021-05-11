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
}

const MealItem: FC<IProps> = ({ withDiscount }) => (
  <View style={styles.meal}>
    <Image style={styles.mealImg} source={require('../../food.png')} />
    <View style={styles.mealInfo}>
      <View>
        <Typography style={styles.mealName} variant={TypographyVariants.body}>
          {'Combo Burger'}
        </Typography>
        <Typography variant={TypographyVariants.smallBody} color={Colors.gunsmoke}>
          {'Shortbread, chocolate turtle cookies, and red velvet.'}
        </Typography>
        {withDiscount && <DiscountIcon style={styles.discountIcon} />}
      </View>
      <View style={styles.priceInfo}>
        <Typography style={withDiscount && styles.throughPrice} variant={TypographyVariants.smallBody}>
          $7.4
        </Typography>
        {withDiscount && (
          <Typography style={styles.discountPrice} variant={TypographyVariants.smallBody}>
            $4.4
          </Typography>
        )}
      </View>
    </View>
  </View>
)

export default memo(MealItem)
