import { TabsNavigationParamsList } from 'navigation/navigators/MainTabs/types'
import { HomeNavigationStackParamsList } from 'navigation/navigators/HomeStack/types'
import { MainNavigationStackParamsList } from 'navigation/navigators/MainStack/types'
import { AccountNavigationStackParamsList } from 'navigation/navigators/AccountStack/types'
import { PlaceNavigationStackParamsList } from 'navigation/navigators/PlaceStack/types'
import { OrderNavigationStackParamsList } from 'navigation/navigators/OrdersStack/types'
import { Routes } from 'navigation/index'
import { LocationSectionsKeys } from 'screens/ChangeAddressModal'

export type RootNavigationStackParamsList = {
  [Routes.RootNavigator]: undefined
  [Routes.DishModal]: { id: number; truckId: number }
  [Routes.ChangeAddressModal]:
    | { prevScreen?: Routes; hideSections?: Array<typeof LocationSectionsKeys[keyof typeof LocationSectionsKeys]> }
    | undefined
  [Routes.CardModal]: undefined
  [Routes.SuccessOrderModal]: { orderId: number }
} & TabsNavigationParamsList &
  MainNavigationStackParamsList &
  HomeNavigationStackParamsList &
  AccountNavigationStackParamsList &
  PlaceNavigationStackParamsList &
  OrderNavigationStackParamsList
