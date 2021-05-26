import React, { memo, FC } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// components
import Typography, { TypographyVariants } from 'components/Typography'
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
      <TouchableOpacity onPress={onPressMinus}>
        <MinusIcon />
      </TouchableOpacity>
      <Typography variant={TypographyVariants.body} style={styles.count}>
        {value}
      </Typography>
      <TouchableOpacity onPress={onPressPlus}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  )
}

export default memo(ItemCount)
