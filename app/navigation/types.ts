import { TabsNavigationParamsList } from 'navigation/navigators/MainTabs/types'
import { HomeNavigationStackParamsList } from 'navigation/navigators/HomeStack/types'
import { MainNavigationStackParamsList } from 'navigation/navigators/MainStack/types'
import { Routes } from 'navigation/index'

export type RootNavigationStackParamsList = {
  [Routes.DishModal]: { id: number; truckId: number }
} & TabsNavigationParamsList &
  MainNavigationStackParamsList &
  HomeNavigationStackParamsList
