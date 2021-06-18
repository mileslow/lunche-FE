import React, { FC, memo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import map from 'lodash.map'
import Typography, { TypographyVariants } from 'components/Typography'
import { Spacing } from 'styles'

const styles = StyleSheet.create({
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.tiny,
  },
})

interface IProps {
  totals: { label: string; value: string; textVariant?: TypographyVariants }[]
  style?: StyleProp<ViewStyle>
}

const Totals: FC<IProps> = ({ totals, style }) => (
  <>
    {map(totals, ({ label, value, textVariant = TypographyVariants.smallBody }, index) => (
      <View key={index} style={[styles.totalRow, style]}>
        <Typography variant={textVariant}>{label}</Typography>
        <Typography variant={textVariant}>{value}</Typography>
      </View>
    ))}
  </>
)
export default memo(Totals)
