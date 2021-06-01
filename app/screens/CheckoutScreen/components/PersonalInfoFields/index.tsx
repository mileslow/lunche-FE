import React, { FC, memo } from 'react'
// libs
import { useTranslation } from 'react-i18next'
import { Control, FieldErrors } from 'react-hook-form'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import styles from 'screens/CheckoutScreen/styles'
import Input from 'components/HookForm/Input'
import { ICreateOrderFormData } from 'screens/CheckoutScreen'
// styles
import { Colors } from 'styles'
// assets
import MailIcon from 'assets/svg/mail.svg'
import PhoneIcon from 'assets/svg/phone.svg'
import ProfileIcon from 'assets/svg/profile.svg'

interface IProps {
  control: Control<ICreateOrderFormData>
  errors: FieldErrors<ICreateOrderFormData>
}

const PersonalInfoFields: FC<IProps> = ({ control, errors }) => {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant={TypographyVariants.subhead} style={styles.label}>
        {t('checkoutScreen:personalInfo')}
      </Typography>
      <Input
        control={control}
        name='client.name'
        autoCapitalize='none'
        autoCorrect={false}
        error={errors?.client?.name?.message}
        leftIcon={<ProfileIcon fill={Colors.midNightMoss} />}
      />
      <Input
        control={control}
        name='client.email'
        autoCapitalize='none'
        autoCompleteType='email'
        autoCorrect={false}
        keyboardType='email-address'
        error={errors?.client?.email?.message}
        leftIcon={<MailIcon />}
      />

      <Input
        control={control}
        name='client.phone'
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='phone-pad'
        error={errors?.client?.phone?.message}
        leftIcon={<PhoneIcon fill={Colors.midNightMoss} />}
      />
    </>
  )
}

export default memo(PersonalInfoFields)
