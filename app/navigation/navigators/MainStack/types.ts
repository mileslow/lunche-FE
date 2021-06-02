import Routes from 'navigation/routes'
import { DeliveryType, PaymentMethodType } from 'store/orders/types'

export type MainNavigationStackParamsList = {
  [Routes.WelcomeScreen]: undefined
  [Routes.MainTabsStack]: undefined
  [Routes.CartScreen]: undefined
  [Routes.TruckScreen]: { id: number }
  [Routes.AboutTruckScreen]: undefined
  [Routes.CheckoutScreen]: { paymentMethod: PaymentMethodType; cardId?: number } | undefined
  [Routes.SignInScreen]: undefined
  [Routes.VerifyCodeScreen]: { phoneNumber: string; popRouteCount?: number }
  [Routes.PaymentScreen]: { cardId?: number; paymentMethod?: PaymentMethodType; typeDelivery?: DeliveryType }
}
