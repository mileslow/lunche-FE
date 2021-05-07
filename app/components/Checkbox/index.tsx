import React, { memo } from 'react'
import { Pressable, View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Colors } from 'styles'

const SIZE = 24

const INNER_SIZE = 16

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderColor: Colors.cadmiumOrange,
    borderWidth: 1,
    height: SIZE,
    justifyContent: 'center',
    width: SIZE,
  },
  checked: {
    backgroundColor: Colors.cadmiumOrange,
    height: INNER_SIZE,
    width: INNER_SIZE,
  },
})

interface IProps {
  checked: boolean
  onPress?: (checked: boolean) => void
  type?: 'radio' | 'checkbox'
  style?: StyleProp<ViewStyle>
}

const Checkbox = ({ checked, onPress, type = 'checkbox', style }: IProps) => (
  <Pressable
    hitSlop={10}
    style={({ pressed }) => [
      styles.checkbox,
      { opacity: pressed ? 0.6 : 1, borderRadius: type === 'radio' ? SIZE / 2 : SIZE / 4 },
      style,
    ]}
    onPress={() => onPress && onPress(!checked)}
  >
    {checked && <View style={[styles.checked, { borderRadius: type === 'radio' ? INNER_SIZE / 2 : INNER_SIZE / 4 }]} />}
  </Pressable>
)

export default memo(Checkbox)
