import { TabsNavigationParamsList } from 'navigation/navigators/MainTabs/types'
import { HomeNavigationStackParamsList } from 'navigation/navigators/HomeStack/types'
import { MainNavigationStackParamsList } from 'navigation/navigators/MainStack/types'
import { AccountNavigationStackParamsList } from 'navigation/navigators/AccountStack/types'
import { PlaceNavigationStackParamsList } from 'navigation/navigators/PlaceStack/types'
import { OrderNavigationStackParamsList } from 'navigation/navigators/OrdersStack/types'
import { Routes } from 'navigation/index'
import { LocationSectionsKeys } from 'screens/ChangeAddressModal'
import { DeliveryType } from 'store/orders/types'

type ModalParamsList = {
  [Routes.DishModal]: { id: number; truckId: number }
  [Routes.ChangeAddressModal]:
    | { prevScreen?: Routes; hideSections?: Array<typeof LocationSectionsKeys[keyof typeof LocationSectionsKeys]> }
    | undefined
  [Routes.CardModal]: undefined
  [Routes.SuccessOrderModal]: { orderId: number }
  [Routes.PaymentFailedModal]: { typeDelivery: DeliveryType; quoteFee?: number }
}

export type RootNavigationStackParamsList = {
  [Routes.RootNavigator]: undefined
} & ModalParamsList &
  TabsNavigationParamsList &
  MainNavigationStackParamsList &
  HomeNavigationStackParamsList &
  AccountNavigationStackParamsList &
  PlaceNavigationStackParamsList &
  OrderNavigationStackParamsList
