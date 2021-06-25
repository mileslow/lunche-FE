import React, { FC } from 'react'
import Svg from 'react-native-svg'
import AnimatedPath from './AnimatedPath'
import { IAnimatedSvgIcon } from './types'
import { Colors } from 'styles'

const BackIcon: FC<{ fill?: string } & IAnimatedSvgIcon> = ({ fill = Colors.midNightMoss, iconAnimatedProps }) => (
  <Svg width='10' height='16' viewBox='0 0 10 16'>
    <AnimatedPath
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.32087 8.00002L8.92511 2.39578C9.33861 1.98229 9.33861 1.31188 8.92511 0.898379C8.51162 0.484883 7.84121 0.484883 7.42771 0.898379L1.07477 7.25132C0.661274 7.66482 0.661274 8.33523 1.07477 8.74872L7.42771 15.1017C7.84121 15.5152 8.51162 15.5152 8.92511 15.1017C9.33861 14.6882 9.33861 14.0178 8.92511 13.6043L3.32087 8.00002Z'
      fill={fill}
      animatedProps={iconAnimatedProps}
    />
  </Svg>
)

export default BackIcon
