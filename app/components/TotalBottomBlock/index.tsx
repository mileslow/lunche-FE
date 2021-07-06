import React, { FC, memo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
// components
import ActionBottomBlock from 'components/ActionBottomBlock'
import Totals, { Total } from 'components/Totals'
// styles
import styles from './styles'

interface IProps {
  onPress: () => void
  textButton: string
  totals: Total[]
  style?: StyleProp<ViewStyle>
  disabledBtn?: boolean
}

const TotalBlock: FC<IProps> = ({ onPress, textButton, totals, style, disabledBtn }) => (
  <ActionBottomBlock disabledBtn={disabledBtn} textButton={textButton} onPress={onPress} style={style}>
    <Totals totals={totals} style={styles.totalRow} />
  </ActionBottomBlock>
)

export default memo(TotalBlock)
