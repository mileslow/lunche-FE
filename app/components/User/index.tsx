import React, { FC, memo } from 'react'
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Typography, { TypographyVariants } from 'components/Typography'
import { Colors, Spacing } from 'styles'

const AVATAR_SIZE = 40

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
  },
  avatar: {
    borderColor: Colors.midNightMoss,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 1,
    height: AVATAR_SIZE,
    marginRight: Spacing.base,
    width: AVATAR_SIZE,
  },
})

interface IProps {
  avatar?: string
  name?: string
  phone?: string
  style?: StyleProp<ViewStyle>
}

const User: FC<IProps> = ({ avatar, name, phone, style }) => (
  <View style={[styles.wrap, style]}>
    <Image style={styles.avatar} source={{ uri: avatar }} />
    <View>
      <Typography variant={TypographyVariants.body}>{name}</Typography>
      <Typography variant={TypographyVariants.body}>{phone}</Typography>
    </View>
  </View>
)

export default memo(User)
