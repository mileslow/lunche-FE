import React, { FC, memo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// components
import Totals, { Total } from 'components/Totals'
import Button, { ButtonTypes } from 'components/Button'
// styles
import { Spacing } from 'styles'
import styles from './styles'

interface IProps {
  onSubmit: () => void
  textButton: string
  totals: Total[]
  style?: StyleProp<ViewStyle>
}

const TotalBlock: FC<IProps> = ({ onSubmit, textButton, totals, style }) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.totals, { paddingBottom: insets.bottom + Spacing.base }, style]}>
      <Totals totals={totals} />
      <Button type={ButtonTypes.primary} title={textButton} style={styles.button} onPress={onSubmit} />
    </View>
  )
}

export default memo(TotalBlock)
