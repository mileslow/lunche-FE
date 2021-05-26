import React, { FC, memo } from 'react'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// components
import Typography, { TypographyVariants } from 'components/Typography'
// assets
import DiscountIcon from 'assets/svg/discount.svg'
// utils
import { getImageBySize } from 'services/utils'
// styles
import { Colors, Metrics } from 'styles'
import styles from './styles'

interface IProps {
  withDiscount?: boolean
  item: {
    name: string
    photo: string
    description: string
    price: number
  }
  onPress: () => void
}

const MealItem: FC<IProps> = ({ withDiscount, item, onPress }) => (
  <TouchableOpacity style={styles.meal} onPress={onPress}>
    <Image
      style={styles.mealImg}
      source={{ uri: getImageBySize(item.photo, Metrics.menuItemSize, Metrics.menuItemSize) }}
    />
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
  </TouchableOpacity>
)

export default memo(MealItem)
