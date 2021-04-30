import Routes from 'navigation/routes'

type TabNavigationParams = undefined

export type HomeNavigationParamsList = {
  [Routes.Main]: undefined
  [Routes.HomeTab]: TabNavigationParams
  [Routes.OrdersTab]: TabNavigationParams
  [Routes.ProfileTab]: TabNavigationParams
}
