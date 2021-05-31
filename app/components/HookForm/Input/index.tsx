import React, { PropsWithChildren, ReactElement, memo } from 'react'
import { Control, Controller, FieldName, FieldValues } from 'react-hook-form'
// components
import Input, { InputProps } from 'components/Form/Input'

type InputAdapterProps = InputProps & {
  control: Control<any>
  name: FieldName<FieldValues>
  defaultValue?: string
  shouldUnregister?: boolean
}

const HookFormInput = ({
  control,
  name,
  defaultValue,
  shouldUnregister,
  ...props
}: PropsWithChildren<InputAdapterProps>): ReactElement => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }): ReactElement => (
        <Input {...props} onBlur={onBlur} onChangeText={(textValue): void => onChange(textValue)} value={value} />
      )}
      name={name}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
    />
  )
}

export default memo(HookFormInput)
