import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import Svg from 'react-native-svg'
import AnimatedPath from './AnimatedPath'
import { IAnimatedSvgIcon } from './types'

const EmptyHeartIcon: FC<IAnimatedSvgIcon & { opacity: number; style: ViewStyle }> = ({
  iconAnimatedProps,
  style,
  opacity,
}) => (
  <Svg width='18' height='16' viewBox='0 0 471.701 471.701' style={style} opacity={opacity}>
    <AnimatedPath
      d='M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909
      l-8.431-8.909C181.284,5.762,98.662,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778
      c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654
      c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z M413.787,234.226h-0.017
      L238.802,418.768L63.818,234.226c-39.78-42.916-39.78-109.233,0-152.149c36.125-39.154,97.152-41.609,136.306-5.484
      c1.901,1.754,3.73,3.583,5.484,5.484l20.804,21.948c6.856,6.812,17.925,6.812,24.781,0l20.804-21.931
      c36.125-39.154,97.152-41.609,136.306-5.484c1.901,1.754,3.73,3.583,5.484,5.484C453.913,125.078,454.207,191.516,413.787,234.226
      z'
      fill='white'
      animatedProps={iconAnimatedProps}
    />
  </Svg>
)

export default EmptyHeartIcon
