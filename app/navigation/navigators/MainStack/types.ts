import Routes from 'navigation/routes'
import { DeliveryType } from 'store/orders/types'
import { PaymentType } from 'store/payments/types'
import { VerifyThunks } from 'screens/VerifyCodeScreen'

export type MainNavigationStackParamsList = {
  [Routes.WelcomeScreen]: undefined
  [Routes.MainTabsStack]: undefined
  [Routes.CartScreen]: undefined
  [Routes.TruckScreen]: { id: number }
  [Routes.AboutTruckScreen]: undefined
  [Routes.CheckoutScreen]: (PaymentType & { address?: string; lat?: number; lng?: number }) | undefined
  [Routes.SignInScreen]: undefined
  [Routes.VerifyCodeScreen]: {
    phoneNumber: string
    popRouteCount?: number
    prevScreen?: Routes
    verifyThunk?: VerifyThunks
    userId?: number
  }
  [Routes.PaymentScreen]: PaymentType & { typeDelivery?: DeliveryType }
  [Routes.SearchTruckModal]: undefined
  [Routes.OrderTrackerScreen]: { orderId: number }
  [Routes.ProfileDetailsScreen]: { successVerify?: boolean } | undefined
  [Routes.LocationsScreen]:
    | {
        lng: number
        lat: number
        address: string
      }
    | undefined
  [Routes.CreditCardsScreen]: undefined
}
