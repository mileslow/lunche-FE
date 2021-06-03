import React, { FC, memo } from 'react'
import { Image, Pressable, View } from 'react-native'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import ItemCount from 'components/ItemCount'
// types
import { OrderItem } from 'store/orders/types'
// assets
import DiscountIcon from 'assets/svg/discount.svg'
// utils
import { getImageBySize } from 'services/utils'
// styles
import { Colors, Metrics } from 'styles'
import styles from './styles'

interface IMealItem {
  id: number
  name: string
  photo: string
  description: string
  price: number
}

interface IProps {
  withDiscount?: boolean
  item: IMealItem
  onPress: () => void
  onCountPress: (number: number) => void
  orderItem?: OrderItem
}

const MealItem: FC<IProps> = ({ withDiscount, item, onPress, orderItem, onCountPress }) => (
  <Pressable
    style={({ pressed }) => [
      styles.meal,
      !!orderItem && { backgroundColor: Colors.darkSeaGreen },
      pressed && { opacity: 0.6 },
    ]}
    onPress={onPress}
  >
    {orderItem ? <View style={styles.greenLine} /> : null}
    <Image
      style={styles.mealImg}
      source={{ uri: getImageBySize(item.photo, Metrics.menuItemSize, Metrics.menuItemSize), cache: 'force-cache' }}
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
      <View style={styles.row}>
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
        {orderItem ? (
          <ItemCount
            onPressPlus={() => onCountPress(1)}
            onPressMinus={() => onCountPress(-1)}
            value={orderItem.itemCount}
          />
        ) : null}
      </View>
    </View>
  </Pressable>
)

export default memo(MealItem)
