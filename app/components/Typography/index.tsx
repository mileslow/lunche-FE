/* eslint-disable react-native/no-unused-styles */
import React, { FC, memo, useMemo, PropsWithChildren } from 'react'
import { Text, StyleSheet, TextProps } from 'react-native'
// styling
import { Colors, FontSize, Fonts } from 'styles'

export enum TypographyWeights {
  thin = '100',
  extraLight = '200',
  lite = '300',
  normal = '400',
  medium = '500',
  semiBold = '600',
  bold = '700',
  extraBold = '800',
  black = '900',
}

export enum TypographyVariants {
  h1 = 'h1',
  h3 = 'h3',
  body = 'body',
  smallBody = 'smallBody',
  subhead = 'subhead',
  caption = 'caption',
  // largeTitle = 'largeTitle',
  // title1 = 'title1',
  // title2 = 'title2',
  // title3 = 'title3',
  headline = 'headline',
  // callout = 'callout',
  // footnote = 'footnote',
  // caption1 = 'caption1',
  // caption2 = 'caption2',
}

export type TypographyProps = TextProps & {
  weight?: keyof typeof TypographyWeights
  variant?: keyof typeof TypographyVariants
  color?: string
}

const Typography: FC<PropsWithChildren<TypographyProps>> = ({ weight, variant, color, style, children, ...props }) => {
  const currentVariant = useMemo(() => (variant ? styles[variant] : styles.body), [variant])

  return (
    <Text
      {...props}
      style={[currentVariant, !!weight && { fontWeight: TypographyWeights[weight] }, !!color && { color }, style]}
    >
      {children}
    </Text>
  )
}

export const styles = StyleSheet.create({
  h1: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.h1,
    fontWeight: TypographyWeights.medium,
  },
  headline: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.headline,
    fontWeight: TypographyWeights.bold,
  },
  h3: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.h3,
    fontWeight: TypographyWeights.semiBold,
  },
  body: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.regular,
    fontWeight: TypographyWeights.normal,
  },
  smallBody: {
    color: Colors.gunsmoke,
    fontFamily: Fonts.regular,
    fontSize: FontSize.base,
    fontWeight: TypographyWeights.normal,
  },
  subhead: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.subhead,
    fontWeight: TypographyWeights.medium,
  },
  caption: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.caption,
    fontWeight: TypographyWeights.normal,
  },
})

export default memo(Typography)
