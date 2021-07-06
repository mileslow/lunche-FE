import React, { FC, memo, ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
})

const KeyboardView: FC<{ children: ReactNode; style?: StyleProp<ViewStyle> }> = ({ children, style }) => (
  <KeyboardAvoidingView style={[styles.content, style]} enabled={Platform.OS === 'ios'} behavior='padding'>
    {children}
  </KeyboardAvoidingView>
)

export default memo(KeyboardView)
