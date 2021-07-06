import React, { FC, memo, ReactNode } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Colors, Spacing } from 'styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button, { ButtonTypes } from 'components/Button'

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.basic,
    borderColor: Colors.borderColor,
    borderTopWidth: 1,
  },
  button: {
    margin: Spacing.double,
  },
})

interface IProps {
  children?: ReactNode
  textButton: string
  onPress: () => void
  disabledBtn?: boolean
  style?: StyleProp<ViewStyle>
}

const ActionBottomBlock: FC<IProps> = ({ style, children, disabledBtn, textButton, onPress }) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom + Spacing.base }, style]}>
      {children}
      <Button
        disabled={disabledBtn}
        type={ButtonTypes.primary}
        title={textButton}
        style={styles.button}
        onPress={onPress}
      />
    </View>
  )
}

export default memo(ActionBottomBlock)
