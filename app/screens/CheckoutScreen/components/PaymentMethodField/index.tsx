import React, { FC, memo, useMemo } from 'react'
// libs
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash.upperfirst'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Button, { ButtonTypes } from 'components/Button'
import Error from 'components/Form/Error'
// assets
import BackIcon from 'assets/svg/back.svg'
// types
import { CreditCard } from 'store/payments/types'
// hooks
import useCreditCardIcon from 'hooks/useCreditCardIcon'
// styles
import styles from 'screens/CheckoutScreen/styles'
import { Colors } from 'styles'
import { PaymentMethodType } from 'store/orders/types'
import { FieldErrors } from 'react-hook-form'
import { ICreateOrderFormData } from 'screens/CheckoutScreen'

interface IProps {
  onPress: () => void
  payment: { paymentMethod?: PaymentMethodType; card?: CreditCard }
  errors: FieldErrors<ICreateOrderFormData>
}

const PaymentMethodField: FC<IProps> = ({ onPress, payment, errors }) => {
  const { t } = useTranslation()

  const cardIcons = useCreditCardIcon({ width: 28, height: 24 })

  const error = useMemo(() => errors.paymentMethod?.message, [errors.paymentMethod])

  return (
    <View style={styles.wrap}>
      <Typography variant={TypographyVariants.subhead} style={styles.label}>
        {t('checkoutScreen:paymentLabel')}
      </Typography>
      <Button
        type={ButtonTypes.link}
        style={[styles.paymentField, { borderColor: error ? Colors.pigmentRed : Colors.borderColor }]}
        onPress={onPress}
      >
        {payment.paymentMethod ? (
          <View style={styles.changeCardBlock}>
            {payment.card?.brand ? cardIcons[payment.card?.brand] : null}
            <Typography style={styles.cardNumber} variant={TypographyVariants.body}>
              {payment.paymentMethod === PaymentMethodType.card
                ? `**** ${payment.card?.lastFourNumbers}`
                : upperFirst(payment.paymentMethod)}
            </Typography>
          </View>
        ) : (
          <Typography> </Typography>
        )}
        <View style={styles.changeCardBlock}>
          <Typography variant={TypographyVariants.body} color={Colors.primary} style={styles.changeCardText}>
            {t('checkoutScreen:changePaymentMethod')}
          </Typography>
          <BackIcon style={styles.greenChevron} width={8} height={14} fill={Colors.primary} />
        </View>
      </Button>
      <Error error={error} />
    </View>
  )
}

export default memo(PaymentMethodField)
