import React, { FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Rect, Path } from 'react-native-svg'

const PlusRectangle: FC<{ stroke?: string; fill?: string; style?: StyleProp<ViewStyle> }> = ({
  style,
  stroke = '#22A45D',
  fill = '#22A45D',
}) => {
  return (
    <Svg width='16' height='16' viewBox='0 0 16 16' style={style}>
      <Rect opacity='0.8' x='0.5' y='0.5' width='15' height='15' rx='1.5' stroke={stroke} />
      <Path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M8.48522 4.60606C8.48522 4.33829 8.26814 4.12122 8.00037 4.12122C7.7326 4.12122 7.51552 4.33829 7.51552 4.60606V7.51515H4.60643C4.33866 7.51515 4.12158 7.73223 4.12158 8C4.12158 8.26778 4.33866 8.48485 4.60643 8.48485H7.51552V11.3939C7.51552 11.6617 7.7326 11.8788 8.00037 11.8788C8.26814 11.8788 8.48522 11.6617 8.48522 11.3939V8.48485H11.3943C11.6621 8.48485 11.8792 8.26778 11.8792 8C11.8792 7.73223 11.6621 7.51515 11.3943 7.51515H8.48522V4.60606Z'
        fill={fill}
      />
    </Svg>
  )
}

export default PlusRectangle
