import Routes from 'navigation/routes'

export type HomeNavigationStackParamsList = {
  [Routes.MainScreen]: undefined
  [Routes.TruckScreen]: { id: number }
  [Routes.AboutTruckScreen]: undefined
}
