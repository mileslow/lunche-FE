import React, { memo, FC } from 'react'
import { View } from 'react-native'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Button, { ButtonTypes } from 'components/Button'
// assets
import MinusIcon from 'assets/svg/minus.svg'
import PlusIcon from 'assets/svg/plus.svg'
// styles
import styles from './styles'

interface IProps {
  value: number
  onPressPlus: () => void
  onPressMinus: () => void
}

const ItemCount: FC<IProps> = ({ value, onPressPlus, onPressMinus }) => {
  return (
    <View style={styles.countWrap}>
      <Button type={ButtonTypes.icon} onPress={onPressMinus}>
        <MinusIcon />
      </Button>
      <Typography variant={TypographyVariants.body} style={styles.count}>
        {value}
      </Typography>
      <Button type={ButtonTypes.icon} onPress={onPressPlus}>
        <PlusIcon />
      </Button>
    </View>
  )
}

export default memo(ItemCount)
