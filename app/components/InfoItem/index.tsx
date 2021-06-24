import React, { FC, memo, useMemo } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'
import map from 'lodash.map'
import Typography, { TypographyVariants } from 'components/Typography'
import { Colors, Spacing } from 'styles'

export interface IProps {
  texts: string[]
  Icon: FC<SvgProps>
  fill?: string
  style?: StyleProp<ViewStyle>
}

const ContactItem: FC<IProps> = ({ texts, Icon, style, fill = Colors.cadmiumOrange }) => {
  const alignItems = useMemo(() => (texts.length > 1 ? 'flex-start' : 'center'), [texts])

  return (
    <View style={[styles.item, { alignItems }, style]}>
      <Icon style={styles.icon} fill={fill} />
      <View>
        {map(texts, (i, index) => (
          <Typography key={index} variant={TypographyVariants.body} style={texts.length > 1 && styles.spacing}>
            {i}
          </Typography>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Spacing.small,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  spacing: {
    marginBottom: Spacing.small,
  },
})

export default memo(ContactItem)
