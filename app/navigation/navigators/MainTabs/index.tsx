import React, { FC, ReactNode } from 'react'
// libs
import { Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SvgProps } from 'react-native-svg'
// navigation
import { RootNavigationStackParamsList, Routes } from 'navigation'
import ExmapleStackNavigator from 'navigation/navigators/ExampleStack'
import MainStackNavigator from 'navigation/navigators/MainStack'
// localization
import { useTranslation } from 'react-i18next'
// assets
import HomeIcon from 'assets/svg/home.svg'
import OrdersIcon from 'assets/svg/orders.svg'
import ProfileIcon from 'assets/svg/profile.svg'
// styles
import { Colors } from 'styles'

const Tab = createBottomTabNavigator<RootNavigationStackParamsList>()

const tabBarIconRender = ({ focused }: { focused: boolean }, Icon: FC<SvgProps>): ReactNode => (
  <Icon opacity={focused ? 1 : 0.5} />
)

const tabBarLabelRender = ({ focused }: { focused: boolean }, label: string): ReactNode => (
  <Text style={[styles.labelStyles, { color: focused ? Colors.primary : Colors.gunsmoke }]}>{label}</Text>
)

const MainTabsNavigator: FC = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.HomeTab}
        component={MainStackNavigator}
        options={{
          tabBarIcon: (props) => tabBarIconRender(props, HomeIcon),
          tabBarLabel: (props) => tabBarLabelRender(props, t('tabs:home')),
        }}
      />
      <Tab.Screen
        name={Routes.OrdersTab}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: (props) => tabBarIconRender(props, OrdersIcon),
          tabBarLabel: (props) => tabBarLabelRender(props, t('tabs:orders')),
        }}
      />
      <Tab.Screen
        name={Routes.ProfileTab}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: (props) => tabBarIconRender(props, ProfileIcon),
          tabBarLabel: (props) => tabBarLabelRender(props, t('tabs:profile')),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  labelStyles: {
    fontSize: 10,
    fontWeight: '500',
  },
})

export default MainTabsNavigator
