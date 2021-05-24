import { TabsNavigationParamsList } from 'navigation/navigators/MainTabs/types'
import { HomeNavigationStackParamsList } from 'navigation/navigators/HomeStack/types'

export type RootNavigationStackParamsList = TabsNavigationParamsList & HomeNavigationStackParamsList
