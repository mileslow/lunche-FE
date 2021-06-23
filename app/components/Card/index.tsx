import React, { FC, memo, ReactNode } from 'react'
import { StyleSheet, Platform, ViewStyle, Pressable, StyleProp } from 'react-native'
import { Colors, Spacing } from 'styles'

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.basic,
    borderRadius: 12,
    elevation: 4,
    marginBottom: Spacing.double,
    shadowColor: Platform.select({ ios: Colors.shadowColor, android: undefined }),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
})

interface IProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const Card: FC<IProps> = ({ children, style, onPress }) => (
  <Pressable
    style={({ pressed }) => [styles.card, { opacity: pressed ? 0.6 : 1 }, style]}
    onPress={onPress}
    disabled={!onPress}
  >
    {children}
  </Pressable>
)

export default memo(Card)
