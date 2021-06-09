import React from 'react'
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native'
import { Colors } from 'styles'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
})

const Spinner = ({ style }: { style?: ViewStyle }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <ActivityIndicator size='large' color={Colors.primary} animating />
    </View>
  )
}

export default Spinner
