import React, { FC } from 'react'
import Svg from 'react-native-svg'
import AnimatedPath from './AnimatedPath'
import { IAnimatedSvgIcon } from './types'

const HeartIcon: FC<IAnimatedSvgIcon> = ({ iconAnimatedProps }) => (
  <Svg width='18' height='16' viewBox='0 0 18 16'>
    <AnimatedPath
      d='M16.6646 1.68792C15.2318 0.00205312 12.7888 -0.390892 10.7811 0.374795C10.038 0.658197 9.12735 1.22357 8.39141 1.93448C5.99148 -0.540053 2.12867 -0.276947 0.512309 3.70802C-1.84671 9.52267 4.49848 12.6604 8.20421 15.5937C8.52635 15.8486 8.89408 15.8537 9.20052 15.7294C9.45945 15.7517 9.72608 15.6874 9.94558 15.4789C13.1568 12.4312 21.1517 6.96719 16.6646 1.68792Z'
      fill='white'
      animatedProps={iconAnimatedProps}
    />
  </Svg>
)

export default HeartIcon
