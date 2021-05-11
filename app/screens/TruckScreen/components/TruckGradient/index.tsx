import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg'

const TruckGradient = () => (
  <Svg style={styles.gradient} height='100%' width='100%' fill={'transparent'}>
    <Defs>
      <LinearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
        <Stop offset='0' stopColor='#000' stopOpacity='0' />
        <Stop offset='0.43' stopColor='#000' stopOpacity='0.43' />
        <Stop offset='1' stopColor='#000' stopOpacity='1' />
      </LinearGradient>
    </Defs>
    <Rect width='100%' height='100%' fill='url(#grad)' />
  </Svg>
)

const styles = StyleSheet.create({
  gradient: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
})

export default memo(TruckGradient)
