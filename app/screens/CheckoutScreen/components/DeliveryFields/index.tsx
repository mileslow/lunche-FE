import React, { FC, memo } from 'react'
import Typography, { TypographyVariants } from 'components/Typography'
import styles from 'screens/CheckoutScreen/styles'
import Input from 'components/HookForm/Input'
import AddressIcon from 'assets/svg/address.svg'
import { Colors } from 'styles'
import { useTranslation } from 'react-i18next'
import { Control, FieldErrors } from 'react-hook-form'
import { ICreateOrderFormData } from 'screens/CheckoutScreen'

interface IProps {
  control: Control<ICreateOrderFormData>
  errors: FieldErrors<ICreateOrderFormData>
  address?: string
}
const DeliveryFields: FC<IProps> = ({ control, errors, address }) => {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant={TypographyVariants.subhead} style={styles.label}>
        {t('checkoutScreen:deliverAddress')}
      </Typography>
      <Input
        shouldUnregister
        control={control}
        defaultValue={address}
        name='deliveryAddress'
        autoCapitalize='none'
        autoCorrect={false}
        error={errors?.deliveryAddress?.message}
        leftIcon={() => <AddressIcon fill={Colors.midNightMoss} />}
      />
    </>
  )
}

export default memo(DeliveryFields)
