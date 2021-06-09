import React, { FC, memo, ReactElement, useMemo } from 'react'
import { Image, Pressable, TextStyle, View } from 'react-native'
// components
import Typography, { TypographyVariants } from 'components/Typography'
// types
// assets
import DiscountIcon from 'assets/svg/discount.svg'
// utils
import { getImageBySize } from 'services/utils'
// styles
import { Colors, Metrics } from 'styles'
import styles from './styles'

interface IItem {
  id: number
  name: string
  photo: string
  description: string
  price: number
}

interface IProps {
  withDiscount?: boolean
  item: IItem
  onPress: () => void
  active?: boolean
  imageSize?: number
  nameTextVariant?: string
  priceTextVariant?: string
  descTextVariant?: string
  descStyle?: TextStyle
  renderBottomRightBlock?: () => ReactElement | ReactElement[] | null
}

const CommonCard: FC<IProps> = ({
  withDiscount,
  item,
  onPress,
  active,
  imageSize,
  nameTextVariant,
  descTextVariant,
  priceTextVariant,
  descStyle,
  renderBottomRightBlock,
}) => {
  const size = useMemo(() => imageSize ?? Metrics.menuItemSize, [imageSize])

  const typographyVariants = useMemo(
    () => ({
      name: TypographyVariants.body ?? nameTextVariant,
      desc: TypographyVariants.smallBody ?? descTextVariant,
      price: TypographyVariants.smallBody ?? priceTextVariant,
    }),
    [nameTextVariant, descTextVariant, priceTextVariant],
  )

  return (
    <Pressable
      style={({ pressed }) => [
        styles.meal,
        active && { backgroundColor: Colors.darkSeaGreen },
        pressed && { opacity: 0.6 },
      ]}
      onPress={onPress}
    >
      {active ? <View style={styles.greenLine} /> : null}
      <Image
        style={[styles.itemImg, { width: size, height: size }]}
        source={{ uri: getImageBySize(item.photo, size, size), cache: 'force-cache' }}
      />

      <View style={styles.itemInfo}>
        <View>
          <Typography style={styles.itemName} variant={typographyVariants.name}>
            {item.name}
          </Typography>
          <Typography variant={typographyVariants.desc} color={Colors.gunsmoke} numberOfLines={2} style={descStyle}>
            {item.description}
          </Typography>

          {withDiscount && <DiscountIcon style={styles.discountIcon} />}
        </View>
        <View style={styles.row}>
          <View style={styles.priceInfo}>
            <Typography
              color={Colors.midNightMoss}
              style={withDiscount && styles.throughPrice}
              variant={typographyVariants.price}
            >
              {item.price} $
            </Typography>
            {withDiscount && (
              <Typography style={styles.discountPrice} variant={TypographyVariants.smallBody}>
                {item.price} $
              </Typography>
            )}
          </View>

          {renderBottomRightBlock && renderBottomRightBlock()}
        </View>
      </View>
    </Pressable>
  )
}

export default memo(CommonCard)
