import Routes from 'navigation/routes'

type TabNavigationParams = undefined

export type TabsNavigationParamsList = {
  [Routes.HomeTab]: TabNavigationParams
  [Routes.OrdersTab]: TabNavigationParams
  [Routes.ProfileTab]: TabNavigationParams
}
