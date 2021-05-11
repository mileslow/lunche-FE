import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from 'styles'

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.concrete,
    height: 1,
    width: '100%',
  },
})

const Divider = () => <View style={styles.divider} />

export default Divider
