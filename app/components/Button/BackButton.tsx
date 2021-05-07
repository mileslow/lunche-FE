/* eslint-disable @typescript-eslint/no-var-requires */
import React, { memo, FC, useMemo, useCallback } from 'react'
import { PressableProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// components
import Button, { ButtonTypes } from 'components/Button'
import { IAnimatedSvgIcon } from 'components/AnimatedSvgComponents/types'

const BackButton: FC<{ fill?: string } & IAnimatedSvgIcon & PressableProps> = ({
  fill,
  iconAnimatedProps,
  ...props
}) => {
  const navigation = useNavigation()

  const Icon = useMemo(
    () =>
      iconAnimatedProps
        ? require('components/AnimatedSvgComponents/BackIcon').default
        : require('assets/svg/back.svg').default,
    [iconAnimatedProps],
  )

  const onPressButton = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Button type={ButtonTypes.icon} onPress={onPressButton} {...props}>
      <Icon fill={fill} iconAnimatedProps={iconAnimatedProps} />
    </Button>
  )
}

export default memo(BackButton)
