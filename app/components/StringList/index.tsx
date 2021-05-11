import React, { Fragment, FC, memo } from 'react'
import { View, ViewStyle } from 'react-native'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
// styles
import { Colors } from 'styles'
import styles from './styles'

const StringList: FC<{ data: string[]; color?: string; style?: ViewStyle }> = ({
  data,
  color = Colors.gunsmoke,
  style,
}) => (
  <View style={[styles.list, style]}>
    {map(data, (i, index) => (
      <Fragment key={index}>
        <Typography
          variant={TypographyVariants.smallBody}
          style={[styles.item, index === 0 && styles.firstItem, { color }]}
        >
          {i}
        </Typography>
        {index < data.length - 1 && <View style={[styles.point, { backgroundColor: color }]} />}
      </Fragment>
    ))}
  </View>
)

export default memo(StringList)
