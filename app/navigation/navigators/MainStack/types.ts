import Routes from 'navigation/routes'

export type MainNavigationStackParamsList = {
  [Routes.MainScreen]: undefined
  [Routes.TruckScreen]: { id: number }
  [Routes.AboutTruckScreen]: undefined
}
