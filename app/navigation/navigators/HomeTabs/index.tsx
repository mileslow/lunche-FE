import React, { FC, ReactNode } from 'react'
// libs
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// navigation
import { Routes, RootNavigationStackParamsList } from 'navigation'
import ExmapleStackNavigator from 'navigation/navigators/ExampleStack'
// localization
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator<RootNavigationStackParamsList>()

const HomeTabsNavigator: FC = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.Tab1}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: (): ReactNode => <Text>First Tab</Text>,
          tabBarLabel: t('common:home'),
        }}
      />
      <Tab.Screen
        name={Routes.Tab2}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: (): ReactNode => <Text>Second Tab</Text>,
          tabBarLabel: 'WoW',
        }}
      />
      <Tab.Screen
        name={Routes.Tab3}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: (): ReactNode => <Text>Second Tab</Text>,
          tabBarLabel: t('common:settings'),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeTabsNavigator
