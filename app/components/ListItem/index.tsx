import React, { memo, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography, { TypographyVariants } from 'components/Typography'
import Button, { ButtonTypes } from 'components/Button'
import Divider from 'components/Divider'
import { Spacing } from 'styles'

const styles = StyleSheet.create({
  searchItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    marginBottom: 4,
  },
  locationInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.double,
  },
  divider: {
    bottom: 0,
    position: 'absolute',
  },
})

interface IProps {
  item: {
    text?: string
    subtext?: string
  }
  leftElement?: () => ReactElement
  rightElement?: () => ReactElement
  onPress: () => void
}

const LocationSearchItem = ({ item, leftElement, onPress, rightElement }: IProps) => (
  <Button pointerEvents='box-only' type={ButtonTypes.link} style={styles.searchItem} onPress={onPress}>
    {leftElement ? leftElement() : null}
    <View style={styles.locationInfo}>
      <View>
        <Typography style={styles.title} variant={TypographyVariants.body}>
          {item.text}
        </Typography>
        {item.subtext && <Typography variant={TypographyVariants.smallBody}>{item.subtext}</Typography>}
      </View>
      {rightElement ? rightElement() : null}
      <Divider style={styles.divider} />
    </View>
  </Button>
)

export default memo(LocationSearchItem)
