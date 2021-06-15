import { TabsNavigationParamsList } from 'navigation/navigators/MainTabs/types'
import { HomeNavigationStackParamsList } from 'navigation/navigators/HomeStack/types'
import { MainNavigationStackParamsList } from 'navigation/navigators/MainStack/types'
import { AccountNavigationStackParamsList } from 'navigation/navigators/AccountStack/types'
import { PlaceNavigationStackParamsList } from 'navigation/navigators/PlaceStack/types'
import { Routes } from 'navigation/index'

export type RootNavigationStackParamsList = {
  [Routes.RootNavigator]: undefined
  [Routes.DishModal]: { id: number; truckId: number }
  [Routes.ChangeAddressModal]: undefined
  [Routes.CardModal]: undefined
} & TabsNavigationParamsList &
  MainNavigationStackParamsList &
  HomeNavigationStackParamsList &
  AccountNavigationStackParamsList &
  PlaceNavigationStackParamsList
