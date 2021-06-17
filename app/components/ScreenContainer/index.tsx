import React, { FC, memo, ReactNode } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from 'styles'

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
})

const ScreenContainer: FC<{ children: ReactNode; style?: ViewStyle }> = ({ children, style }) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }, style]}>{children}</View>
  )
}

export default memo(ScreenContainer)
