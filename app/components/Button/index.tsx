import React, { FC, ReactChildren, ReactElement } from 'react'
import { StyleSheet, Pressable, PressableProps, Text } from 'react-native'
// styling
import { Colors, FontSize } from 'styles'

export enum ButtonTypes {
  primary = 'primary',
  link = 'link',
  icon = 'icon',
}

type ButtonProps = PressableProps & {
  title?: string
  type?: ButtonTypes
  children: ReactChildren | ReactElement
}

const Button: FC<ButtonProps> = ({ title, type = ButtonTypes.primary, children, ...props }) => {
  const typeButtonStyles = {
    [ButtonTypes.primary]: styles.primary,
    [ButtonTypes.link]: styles.link,
    [ButtonTypes.icon]: styles.icon,
  }

  const typeButtonBackgroundColor = {
    [ButtonTypes.primary]: Colors.primary,
    [ButtonTypes.link]: undefined,
    [ButtonTypes.icon]: undefined,
  }

  const typeButtonTextColor = {
    [ButtonTypes.primary]: Colors.basic,
    [ButtonTypes.link]: Colors.primary,
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
      {children ? children : <Text style={[styles.title, { color: typeButtonTextColor[type] }]}>{title}</Text>}
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
    fontWeight: '900',
  },
  primary: {
    borderRadius: 22,
    color: Colors.primary,
  },
  icon: {
    borderRadius: 24 / 2,
    height: 24,
    width: 24,
  },
  link: {},
})

export default Button
