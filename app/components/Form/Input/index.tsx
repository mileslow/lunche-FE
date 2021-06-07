import React, { FC, memo, ReactElement, useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import Typography from 'components/Typography'
import { Colors, Fonts, FontSize, Spacing } from 'styles'

export type InputProps = TextInputProps & {
  label?: string
  error?: string
  leftIcon?: () => ReactElement
  rightIcon?: () => ReactElement
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
  placeholderTextColor?: string
  withError?: boolean
}

const Input: FC<InputProps> = ({
  containerStyle,
  label,
  error,
  editable = true,
  leftIcon,
  rightIcon,
  placeholderTextColor = Colors.gunsmoke,
  withError = true,
  labelStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={containerStyle}>
      {label && (
        <View style={styles.labelContainer}>
          <Typography style={labelStyle}>{label}</Typography>
        </View>
      )}
      <View>
        <TextInput
          {...props}
          placeholderTextColor={placeholderTextColor}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          style={[
            styles.input,
            {
              borderColor: error ? Colors.pigmentRed : isFocused ? Colors.primary : Colors.borderColor,
              color: Colors.midNightMoss,
              backgroundColor: Colors.alabaster,
            },
            !editable && {
              ...styles.disabledInput,
              backgroundColor: Colors.alabaster,
            },
            leftIcon && styles.leftBlock,
            rightIcon && styles.rightBlock,
            props.style,
          ]}
        />
        {leftIcon && <View style={styles.leftIcon}>{leftIcon()}</View>}
        {rightIcon && <View style={styles.rightIcon}>{rightIcon()}</View>}
      </View>
      {withError && (
        <View style={styles.errorContainer}>
          {!!error && <Text style={[styles.error, { color: Colors.pigmentRed }]}>{error}</Text>}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: Spacing.base,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: Fonts.regular,
    fontSize: FontSize.regular,
    paddingHorizontal: Spacing.regular,
    paddingVertical: Spacing.medium,
  },
  disabledInput: {
    borderStyle: 'dashed',
    opacity: 0.8,
  },
  errorContainer: {
    marginTop: Spacing.tiny,
    minHeight: 14,
  },
  error: {
    fontSize: FontSize.base,
  },
  leftIcon: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: 48,
  },
  rightIcon: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 48,
  },
  leftBlock: {
    paddingLeft: 48,
  },
  rightBlock: {
    paddingRight: 48,
  },
})

export default memo(Input)
