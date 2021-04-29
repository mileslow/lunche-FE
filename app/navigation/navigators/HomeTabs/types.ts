import Routes from 'navigation/routes'

type TabNavigationParams = undefined

export type HomeNavigationParamsList = {
  [Routes.Main]: undefined
  [Routes.Tab1]: TabNavigationParams
  [Routes.Tab2]: TabNavigationParams
  [Routes.Tab3]: TabNavigationParams
}
