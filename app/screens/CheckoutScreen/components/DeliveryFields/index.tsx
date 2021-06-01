import React, { FC, memo } from 'react'
import Typography, { TypographyVariants } from 'components/Typography'
import styles from 'screens/CheckoutScreen/styles'
import Input from 'components/HookForm/Input'
import AddressIcon from 'assets/svg/address.svg'
import { Colors } from 'styles'
import TimeField from 'screens/CheckoutScreen/components/TimeField'
import { useTranslation } from 'react-i18next'
import { Control, FieldErrors } from 'react-hook-form'
import { ICreateOrderFormData } from 'screens/CheckoutScreen'

interface IProps {
  control: Control<ICreateOrderFormData>
  errors: FieldErrors<ICreateOrderFormData>
}
const DeliveryFields: FC<IProps> = ({ control, errors }) => {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant={TypographyVariants.subhead} style={styles.label}>
        {t('checkoutScreen:deliverAddress')}
      </Typography>
      <Input
        shouldUnregister
        control={control}
        name='deliveryAddress'
        autoCapitalize='none'
        autoCorrect={false}
        error={errors?.deliveryAddress?.message}
        leftIcon={<AddressIcon fill={Colors.midNightMoss} />}
      />

      <Typography variant={TypographyVariants.subhead} style={styles.label}>
        {t('checkoutScreen:deliveryDate')}
      </Typography>

      <TimeField shouldUnregister name='deliveryDate' control={control} />
    </>
  )
}

export default memo(DeliveryFields)
