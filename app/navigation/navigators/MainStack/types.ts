import Routes from 'navigation/routes'

export type MainNavigationStackParamsList = {
  [Routes.WelcomeScreen]: undefined
  [Routes.MainTabsStack]: undefined
  [Routes.CartScreen]: undefined
  [Routes.TruckScreen]: { id: number }
  [Routes.AboutTruckScreen]: undefined
  [Routes.CheckoutScreen]: undefined
}
