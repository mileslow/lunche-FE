import React, { FC, memo, ReactElement } from 'react'
import { View, ViewStyle } from 'react-native'
import map from 'lodash.map'
import Typography, { TypographyVariants } from 'components/Typography'
import { Colors } from 'styles'
import styles from './styles'

interface IProps {
  data: Array<{ icon: ReactElement; text: string }>
  style?: ViewStyle
  color?: string
}
const InfoWithIconList: FC<IProps> = ({ data, style, color = Colors.midNightMoss }) => (
  <View style={[styles.info, style]}>
    {map(data, (item, index) => (
      <View key={index} style={styles.infoItem}>
        {item.icon}
        <Typography style={styles.infoText} variant={TypographyVariants.smallBody} color={color}>
          {item.text}
        </Typography>
      </View>
    ))}
  </View>
)

export default memo(InfoWithIconList)
