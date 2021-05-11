import React, { FC, memo, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import Typography, { TypographyVariants } from 'components/Typography'
import { Spacing } from 'styles'

interface IProps {
  item: {
    text: string
    icon: FC<SvgProps>
  }
}

const ContactItem: FC<IProps> = ({ item }) => {
  const Icon = useMemo(() => item.icon, [item.icon])

  return (
    <View style={styles.item}>
      <Icon style={styles.icon} />
      <Typography variant={TypographyVariants.body}>{item.text}</Typography>
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
    paddingHorizontal: Spacing.double,
  },
})

export default memo(ContactItem)
