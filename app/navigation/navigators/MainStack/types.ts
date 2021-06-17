import Routes from 'navigation/routes'
import { DeliveryType } from 'store/orders/types'
import { PaymentType } from 'store/payments/types'

export type MainNavigationStackParamsList = {
  [Routes.WelcomeScreen]: undefined
  [Routes.MainTabsStack]: undefined
  [Routes.CartScreen]: undefined
  [Routes.TruckScreen]: { id: number }
  [Routes.AboutTruckScreen]: undefined
  [Routes.CheckoutScreen]: PaymentType | undefined
  [Routes.SignInScreen]: undefined
  [Routes.VerifyCodeScreen]: { phoneNumber: string; popRouteCount?: number }
  [Routes.PaymentScreen]: PaymentType & { typeDelivery?: DeliveryType }
  [Routes.SearchTruckModal]: undefined
}
