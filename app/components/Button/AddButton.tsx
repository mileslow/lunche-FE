import React, { FC } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
// components
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import PlusRectangle from 'components/SvgComponents/PlusRectangle'
// styles
import { Colors, Spacing } from 'styles'

const styles = StyleSheet.create({
  addCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})

interface IProps {
  onPress: () => void
  text: string
  style?: StyleProp<ViewStyle>
  color?: string
}

const AddButton: FC<IProps> = ({ onPress, text, style, color }) => (
  <Button type={ButtonTypes.link} style={[styles.addCard, style]} onPress={onPress}>
    <PlusRectangle
      style={{ marginRight: Spacing.medium }}
      stroke={color || Colors.primary}
      fill={color || Colors.primary}
    />
    <Typography variant={TypographyVariants.body} color={color || Colors.primary}>
      {text}
    </Typography>
  </Button>
)

export default AddButton
