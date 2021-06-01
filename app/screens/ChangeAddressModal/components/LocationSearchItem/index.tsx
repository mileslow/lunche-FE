import React, { FC, memo } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { SvgProps } from 'react-native-svg'
import Typography, { TypographyVariants } from 'components/Typography'
import Divider from 'components/Divider'
import { Spacing } from 'styles'

const styles = StyleSheet.create({
  searchItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: Spacing.double,
  },
  searchIcon: {
    marginRight: Spacing.base,
  },
  title: {
    marginBottom: 2,
  },
  locationInfo: {
    flex: 1,
    paddingTop: Spacing.small,
  },
  divider: {
    marginTop: Spacing.small,
  },
})

interface IProps {
  item: {
    address?: string
    district?: string
  }
  Icon: FC<SvgProps>
  onPress: () => void
}

const LocationSearchItem = ({ item, Icon, onPress }: IProps) => (
  <Pressable style={({ pressed }) => [styles.searchItem, pressed && { opacity: 0.6 }]} onPress={onPress}>
    <Icon width={24} style={styles.searchIcon} />
    <View style={styles.locationInfo}>
      <Typography style={styles.title} variant={TypographyVariants.body}>
        {item.address}
      </Typography>
      <Typography variant={TypographyVariants.smallBody}>{item.district}</Typography>
      <Divider style={styles.divider} />
    </View>
  </Pressable>
)

export default memo(LocationSearchItem)
