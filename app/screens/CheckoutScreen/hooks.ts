import { useCallback, useMemo } from 'react'
// libs
import { useDispatch, useSelector } from 'react-redux'
import { useApplePay, useConfirmPayment } from '@stripe/stripe-react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import round from 'lodash.round'
// store
import { createPayment } from 'store/payments/thunks'
import { truckTaxSelector } from 'store/trucks/selectors'
import { orderAmountSelector } from 'store/orders/selectors'
// type
import { PaymentBrand } from 'store/payments/types'
import { NotPayedOrder } from 'store/orders/types'
import { AppDispatch } from 'store'
import { ApplePayError, StripeError } from '@stripe/stripe-react-native/src/types/Errors'
import { Total } from 'components/Totals'
import { DeliveryType } from 'store/orders/types'
import { TypographyVariants } from 'components/Typography'

import { Routes } from 'navigation'

export const useMakeCardPayment = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { isApplePaySupported, presentApplePay, confirmApplePayPayment } = useApplePay()

  const { confirmPayment } = useConfirmPayment()

  const makeApplePayPayment = useCallback(
    async (
      order: NotPayedOrder & { clientSecret: string },
    ): Promise<{ isSuccess: boolean; error?: StripeError<ApplePayError> }> => {
      const { error } = await presentApplePay({
        cartItems: [{ label: 'Your order', amount: `${order.amount}` }],
        country: 'US',
        currency: 'USD',
      })
      if (error) {
        return { error, isSuccess: false }
      }

      const { error: confirmError } = await confirmApplePayPayment(order.clientSecret)
      if (confirmError) {
        return { error: confirmError, isSuccess: false }
      }
      return { isSuccess: true }
    },
    [confirmApplePayPayment, presentApplePay],
  )

  const makeCardPayment = useCallback(
    async (order: NotPayedOrder) => {
      const paymentResult = await dispatch(createPayment({ id: order.id, params: { cardId: order.cardId } }))
      if (createPayment.fulfilled.match(paymentResult)) {
        const { clientSecret, paymentMethodId } = paymentResult.payload
        const { error } =
          order.cardBrand === PaymentBrand.applePay
            ? await makeApplePayPayment({ ...order, clientSecret })
            : await confirmPayment(clientSecret, { type: 'Card', paymentMethodId })
        if (error) {
          return { error }
        }
      }
      return { error: createPayment.rejected.match(paymentResult) ? paymentResult.error.message : undefined }
    },
    [makeApplePayPayment, dispatch, confirmPayment],
  )

  return { makeCardPayment, isApplePaySupported }
}

export const useTotals = ({ quoteFee, typeDelivery }: { quoteFee?: number; typeDelivery: DeliveryType }) => {
  const { t } = useTranslation()

  const currentTruckTax = useSelector(truckTaxSelector)

  const orderAmount = useSelector(orderAmountSelector)

  return useMemo(() => {
    const deliveryFee = quoteFee ?? 0
    let fields: Total[] = [
      { label: t('totals:order'), value: `$ ${orderAmount}` },
      { label: t('totals:fee'), value: `$ ${currentTruckTax}` },
    ]
    if (typeDelivery === DeliveryType.DELIVERY) {
      fields = [...fields, { label: t('totals:deliveryFee'), value: `$ ${deliveryFee}` }]
    }
    fields = [
      ...fields,
      {
        label: t('totals:total'),
        value: `$ ${round(orderAmount + currentTruckTax + deliveryFee, 2)}`,
        textVariant: TypographyVariants.body,
      },
    ]
    return fields
  }, [t, orderAmount, typeDelivery, quoteFee, currentTruckTax])
}

export const useRedirectToSuccessModal = () => {
  const navigation = useNavigation()

  return useCallback(
    (orderId: number) => {
      navigation.reset({
        index: 1,
        routes: [
          { name: Routes.RootNavigator },
          {
            name: Routes.SuccessOrderModal,
            params: { orderId: orderId },
          },
        ],
      })
    },
    [navigation],
  )
}
