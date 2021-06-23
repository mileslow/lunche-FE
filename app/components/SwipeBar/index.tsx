import React, { FC } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Colors } from 'styles'

const styles = StyleSheet.create({
  swipeBar: {
    backgroundColor: Colors.gunsmoke,
    borderRadius: 2,
    height: 4,
    width: 34,
  },
})

const SwipeBar: FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => <View style={[styles.swipeBar, style]} />

export default SwipeBar
