import React, { FC, memo } from 'react'
import { View } from 'react-native'
import styles from 'screens/CartScreen/styles'
import Typography, { TypographyVariants } from 'components/Typography'
import ItemCount from 'components/ItemCount'
import Button, { ButtonTypes } from 'components/Button'
import DeleteIcon from 'assets/svg/delete.svg'
import { Colors } from 'styles'
import round from 'lodash.round'

interface IProps {
  name: string
  itemCount: number
  price: number
  onPressMinus: () => void
  onPressPlus: () => void
  handleDeleteDish: () => void
}

const CartItem: FC<IProps> = ({ name, itemCount, price, onPressMinus, onPressPlus, handleDeleteDish }) => (
  <View>
    <View style={styles.row}>
      <Typography variant={TypographyVariants.body}>{name}</Typography>
      <ItemCount onPressMinus={onPressMinus} onPressPlus={onPressPlus} value={itemCount} />
    </View>
    <View style={styles.row}>
      <Button type={ButtonTypes.icon} onPress={handleDeleteDish}>
        <DeleteIcon />
      </Button>
      <Typography color={Colors.midNightMoss} variant={TypographyVariants.body}>
        $ {round(price * itemCount, 2)}
      </Typography>
    </View>
  </View>
)

export default memo(CartItem)
