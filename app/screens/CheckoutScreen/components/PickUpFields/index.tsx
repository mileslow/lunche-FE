import React, { FC, memo } from 'react'
// libs
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Control } from 'react-hook-form'
import round from 'lodash.round'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import TimeField from 'screens/CheckoutScreen/components/TimeField'
// assets
import AddressIcon from 'assets/svg/address.svg'
import DistanceIcon from 'assets/svg/distance.svg'
// styles
import styles from 'screens/CheckoutScreen/styles'
import { Colors } from 'styles'

interface IProps {
  control: Control<any>
  address: string
  distance: number
}
const PickupFields: FC<IProps> = ({ control, address, distance }) => {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant={TypographyVariants.subhead} style={styles.label}>
        {t('checkoutScreen:pickUpAddress')}
      </Typography>
      <View style={styles.readOnlyField}>
        <View style={styles.readonlyFieldPart}>
          <AddressIcon fill={Colors.midNightMoss} style={styles.addressIcon} />
          <Typography variant={TypographyVariants.body}>{address}</Typography>
        </View>
        <View style={styles.readonlyFieldPart}>
          <DistanceIcon style={styles.addressIcon} />
          <Typography variant={TypographyVariants.body}>{round(distance / 1000, 2)} km</Typography>
        </View>
      </View>

      <TimeField shouldUnregister name='pickupDate' control={control} />
    </>
  )
}

export default memo(PickupFields)
