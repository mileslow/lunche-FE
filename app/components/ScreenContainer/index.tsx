import React, { FC, memo, ReactNode } from 'react'
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spinner from 'components/Spinner'
import { Colors } from 'styles'

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
})

interface IProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
}

const ScreenContainer: FC<IProps> = ({ children, style, isLoading }) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }, style]}>
      {children}
      {isLoading ? <Spinner /> : null}
    </View>
  )
}

export default memo(ScreenContainer)
