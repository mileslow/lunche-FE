import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useApplePay } from '@stripe/stripe-react-native'
import { ApplePayError, StripeError } from '@stripe/stripe-react-native/src/types/Errors'
import { createPayment } from 'store/payments/thunks'
import { PaymentBrand } from 'store/payments/types'
import { AppDispatch } from 'store'

export type NotPayedOrder = { id: number; amount: number; paymentMethod: string; cardId?: number; cardBrand?: string }

export const useMakeCardPayment = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { isApplePaySupported, presentApplePay, confirmApplePayPayment } = useApplePay()

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
        if (order.cardBrand === PaymentBrand.applePay) {
          const { error } = await makeApplePayPayment({ ...order, clientSecret: paymentResult.payload.clientSecret })
          if (error) {
            return { error }
          }
        }
      }
      return { error: createPayment.rejected.match(paymentResult) ? paymentResult.error.message : undefined }
    },
    [makeApplePayPayment, dispatch],
  )

  return { makeCardPayment, isApplePaySupported }
}