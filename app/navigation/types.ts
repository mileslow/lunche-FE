import { TabsNavigationParamsList } from 'navigation/navigators/MainTabs/types'
import { ExampleNavigationStackParamsList } from 'navigation/navigators/ExampleStack/types'
import { MainNavigationStackParamsList } from 'navigation/navigators/MainStack/types'

export type RootNavigationStackParamsList = TabsNavigationParamsList &
  ExampleNavigationStackParamsList &
  MainNavigationStackParamsList
