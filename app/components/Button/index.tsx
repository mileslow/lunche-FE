import React, { FC, ReactChildren, ReactElement } from 'react'
import { StyleSheet, Pressable, PressableProps, TextStyle } from 'react-native'
// styling
import { Colors, FontSize } from 'styles'
import Typography, { TypographyVariants } from 'components/Typography'

export enum ButtonTypes {
  primary = 'primary',
  basic = 'basic',
  link = 'link',
  icon = 'icon',
}

type ButtonProps = PressableProps & {
  title?: string
  type?: ButtonTypes
  children?: ReactChildren | ReactElement | ReactChildren[] | ReactElement[]
  textStyle?: TextStyle
}

const Button: FC<ButtonProps> = ({ title, type = ButtonTypes.primary, children, textStyle, ...props }) => {
  const typeButtonStyles = {
    [ButtonTypes.primary]: styles.primary,
    [ButtonTypes.link]: styles.link,
    [ButtonTypes.icon]: styles.icon,
    [ButtonTypes.basic]: styles.basic,
  }

  const typeButtonBackgroundColor = {
    [ButtonTypes.primary]: Colors.primary,
    [ButtonTypes.basic]: Colors.concrete,
    [ButtonTypes.link]: undefined,
    [ButtonTypes.icon]: undefined,
  }

  const typeButtonTextColor = {
    [ButtonTypes.primary]: Colors.basic,
    [ButtonTypes.link]: Colors.primary,
    [ButtonTypes.basic]: Colors.midNightMoss,
    [ButtonTypes.icon]: undefined,
  }

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.container,
        typeButtonStyles[type],
        { backgroundColor: typeButtonBackgroundColor[type], opacity: pressed ? 0.6 : 1 },
        props.disabled && styles.disabledContainer,
        props.style,
      ]}
    >
      {children ? (
        children
      ) : (
        <Typography
          variant={TypographyVariants.smallBody}
          weight='semiBold'
          style={[styles.title, textStyle, { color: typeButtonTextColor[type] }]}
        >
          {title}
        </Typography>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  title: {
    fontSize: FontSize.regular,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  primary: {
    borderRadius: 8,
    color: Colors.primary,
    height: 48,
  },
  icon: {
    borderRadius: 24 / 2,
    height: 24,
    width: 24,
  },
  link: {},
  basic: {
    borderRadius: 4,
    height: 36,
  },
})

export default Button
