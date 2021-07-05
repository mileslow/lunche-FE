import React, { FC, memo, useCallback, useState } from 'react'
// libs
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// components
import Header from 'components/Header'
import ScreenContainer from 'components/ScreenContainer'
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import TotalBlock from 'screens/CheckoutScreen/components/TotalBlock'
// store
import { setNotPayedOrder } from 'store/orders/model'
import { notPayedOrderSelector } from 'store/orders/selectors'
// types
import { AppDispatch } from 'store'
import { StackScreenProps } from '@react-navigation/stack'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// hooks
import { useMakeCardPayment, useRedirectToSuccessModal, useTotals } from 'screens/CheckoutScreen/hooks'
// assets
import FailedPaymentIcon from 'assets/svg/failed-payment.svg'
import CloseIcon from 'assets/svg/close.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'

const PaymentFailedModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.PaymentFailedModal>> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation()

  const notPayedOrder = useSelector(notPayedOrderSelector)

  const { makeCardPayment } = useMakeCardPayment()

  const { quoteFee, typeDelivery } = route.params || {}

  const totals = useTotals({ quoteFee, typeDelivery })

  const [isLoading, setLoading] = useState<boolean>(false)

  const redirectToSuccessModal = useRedirectToSuccessModal()

  const dispatch = useDispatch<AppDispatch>()

  const handlePayOrder = useCallback(async () => {
    if (notPayedOrder) {
      setLoading(true)
      const { error } = await makeCardPayment(notPayedOrder)
      setLoading(false)
      if (!error) {
        dispatch(setNotPayedOrder(null))
        redirectToSuccessModal(notPayedOrder.id)
      }
    }
  }, [dispatch, notPayedOrder, makeCardPayment, redirectToSuccessModal])

  const handleCloseModal = useCallback(() => {
    dispatch(setNotPayedOrder(null))
    navigation.goBack()
  }, [dispatch, navigation])

  const closeModalIcon = useCallback(
    () => (
      <Button type={ButtonTypes.icon} onPress={handleCloseModal}>
        <CloseIcon width={28} height={28} />
      </Button>
    ),
    [handleCloseModal],
  )

  return (
    <ScreenContainer style={styles.screen} isLoading={isLoading}>
      <Header left={closeModalIcon} />
      <View style={styles.content}>
        <FailedPaymentIcon />
        <Typography variant={TypographyVariants.h3}>{t('paymentFailedModal:mainTitle')}</Typography>
        <Typography variant={TypographyVariants.body} style={styles.subtext}>
          {t('paymentFailedModal:subText')}{' '}
          <Typography color={Colors.primary}>{t('paymentFailedModal:contact')}</Typography>
        </Typography>
      </View>
      <TotalBlock totals={totals} textButton={t('paymentFailedModal:payOrderButton')} onSubmit={handlePayOrder} />
    </ScreenContainer>
  )
}

export default memo(PaymentFailedModal)
