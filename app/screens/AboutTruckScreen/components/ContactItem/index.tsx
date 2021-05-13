import React, { FC, memo, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import map from 'lodash.map'
import Typography, { TypographyVariants } from 'components/Typography'
import { Spacing } from 'styles'

interface IProps {
  item: {
    texts: string[]
    icon: FC<SvgProps>
  }
}

const ContactItem: FC<IProps> = ({ item }) => {
  const Icon = useMemo(() => item.icon, [item.icon])

  const alignItems = useMemo(() => (item.texts.length > 1 ? 'flex-start' : 'center'), [item])

  return (
    <View style={[styles.item, { alignItems }]}>
      <Icon style={styles.icon} />
      <View>
        {map(item.texts, (i, index) => (
          <Typography key={index} variant={TypographyVariants.body} style={styles.text}>
            {i}
          </Typography>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: Spacing.small,
    marginRight: Spacing.small,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.double,
  },
  text: {
    marginBottom: Spacing.small,
  },
})

export default memo(ContactItem)
