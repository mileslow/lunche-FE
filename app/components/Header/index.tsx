import React, { FC, memo, ReactElement, useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import BackButton from 'components/Button/BackButton'
// styles
import styles from './styles'

interface IProps {
  title?: string
  left?: () => ReactElement
  right?: () => ReactElement
  style?: ViewStyle
  withBack?: boolean
  bgColor?: string
}
const Header: FC<IProps> = ({ title, style, left, right, withBack, bgColor }) => {
  const accessoryLeft = useMemo(() => (withBack ? <BackButton style={styles.backIcon} /> : left && left()), [
    withBack,
    left,
  ])

  return (
    <View style={[styles.header, bgColor ? { backgroundColor: bgColor } : undefined, style]}>
      <View style={styles.accessory}>{accessoryLeft}</View>
      {title ? (
        <View style={styles.headerTitle} pointerEvents='none'>
          <Typography variant={TypographyVariants.subhead}>{title}</Typography>
        </View>
      ) : null}
      <View style={styles.accessory}>{right && right()}</View>
    </View>
  )
}

export default memo(Header)
