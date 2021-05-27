import React, { FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Colors } from 'styles'

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.concrete,
    height: 1,
    width: '100%',
  },
})

const Divider: FC<{ style?: ViewStyle }> = ({ style }) => <View style={[styles.divider, style]} />

export default Divider
