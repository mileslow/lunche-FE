import React, { memo, ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
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
    flex: 1,
    marginBottom: 4,
  },
  locationInfo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.double,
  },
  divider: {
    bottom: 0,
    position: 'absolute',
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
})

export interface IProps {
  text?: string
  subtext?: string
  leftElement?: () => ReactNode
  rightElement?: () => ReactNode
  onPress?: () => void
  withDivider?: boolean
  style?: StyleProp<ViewStyle>
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto'
}

const ListItem = ({
  text,
  subtext,
  leftElement,
  onPress,
  rightElement,
  style,
  withDivider = true,
  pointerEvents = 'box-only',
}: IProps) => (
  <Button pointerEvents={pointerEvents} type={ButtonTypes.link} style={[styles.searchItem, style]} onPress={onPress}>
    {leftElement ? leftElement() : null}
    <View style={styles.locationInfo}>
      <View style={styles.textBlock}>
        <Typography style={styles.title} variant={TypographyVariants.body}>
          {text}
        </Typography>
        {subtext && <Typography variant={TypographyVariants.smallBody}>{subtext}</Typography>}
      </View>
      {rightElement ? rightElement() : null}
      {withDivider && <Divider style={styles.divider} />}
    </View>
  </Button>
)

export default memo(ListItem)
