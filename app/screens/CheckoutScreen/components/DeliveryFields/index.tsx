import React, { FC, memo, ReactElement, useMemo } from 'react'
// libs
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Error from 'components/Form/Error'
import Button, { ButtonTypes } from 'components/Button'
// types
import { ICreateOrderFormData } from 'screens/CheckoutScreen'
import { CurrentLocation } from 'services/geoLocation'
// assets
import AddressIcon from 'assets/svg/address.svg'
// styles
import styles from 'screens/CheckoutScreen/styles'
import { Colors } from 'styles'

interface IProps {
  control: Control<ICreateOrderFormData>
  errors: FieldErrors<ICreateOrderFormData>
  location?: CurrentLocation | null
  onPressAddress: () => void
}
const DeliveryFields: FC<IProps> = ({ control, errors, location, onPressAddress }) => {
  const { t } = useTranslation()

  const error = errors.deliveryAddress?.address?.message

  const defaultValue = useMemo(
    () =>
      location
        ? {
            address: location.address ?? '',
            lat: location.lat,
            lng: location.lng,
          }
        : undefined,
    [location],
  )

  return (
    <>
      <Typography variant={TypographyVariants.subhead} style={styles.label}>
        {t('checkoutScreen:deliverAddress')}
      </Typography>
      <Controller
        control={control}
        render={({ field: { value } }): ReactElement => (
          <Button
            type={ButtonTypes.link}
            style={[styles.field, styles.addressField, { borderColor: error ? Colors.pigmentRed : Colors.borderColor }]}
            onPress={onPressAddress}
          >
            <AddressIcon style={styles.addressIcon} fill={Colors.midNightMoss} />
            <Typography variant={TypographyVariants.body}>{value?.address}</Typography>
          </Button>
        )}
        name='deliveryAddress'
        defaultValue={defaultValue}
        shouldUnregister
      />
      <Error error={error} />
    </>
  )
}

export default memo(DeliveryFields)
