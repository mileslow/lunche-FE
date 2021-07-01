import React, { FC, memo } from 'react'
// libs
import { Control, FieldErrors } from 'react-hook-form'
// components
import Input from 'components/HookForm/Input'
// styles
import { Colors } from 'styles'
// assets
import MailIcon from 'assets/svg/mail.svg'
import PhoneIcon from 'assets/svg/phone.svg'
import ProfileIcon from 'assets/svg/profile.svg'

interface IProps {
  control: Control<any>
  errors: FieldErrors
  editable?: boolean
}

const PersonalInfoFields: FC<IProps> = ({ control, errors, editable = true }) => (
  <>
    <Input
      editable={editable}
      control={control}
      name='client.name'
      autoCapitalize='none'
      autoCorrect={false}
      error={errors?.client?.name?.message}
      leftIcon={() => <ProfileIcon fill={Colors.midNightMoss} />}
    />
    <Input
      editable={editable}
      control={control}
      name='client.email'
      autoCapitalize='none'
      autoCompleteType='email'
      autoCorrect={false}
      keyboardType='email-address'
      error={errors?.client?.email?.message}
      leftIcon={() => <MailIcon />}
    />

    <Input
      editable={editable}
      control={control}
      name='client.phone'
      autoCapitalize='none'
      autoCorrect={false}
      keyboardType='phone-pad'
      error={errors?.client?.phone?.message}
      leftIcon={() => <PhoneIcon fill={Colors.midNightMoss} />}
    />
  </>
)

export default memo(PersonalInfoFields)
