import React, { FC, memo, ReactNode, useMemo } from 'react'
// libs
import { StyleSheet, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SvgProps } from 'react-native-svg'
// navigation
import { RootNavigationStackParamsList, Routes } from 'navigation'
import HomeStackNavigator from 'navigation/navigators/HomeStack'
import AccountStackNavigator from 'navigation/navigators/AccountStack'
import PlaceStackNavigator from 'navigation/navigators/PlaceStack'
// screen
import OrdersScreen from 'screens/OrdersScreen'
// localization
import { useTranslation } from 'react-i18next'
// assets
import HomeIcon from 'assets/svg/home.svg'
import OrdersIcon from 'assets/svg/orders.svg'
import ProfileIcon from 'assets/svg/profile.svg'
import FavoriteIcon from 'assets/svg/favorite-place.svg'
// styles
import { Colors, Metrics, Spacing } from 'styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator<RootNavigationStackParamsList>()

const tabBarIconRender = ({ focused }: { focused: boolean }, Icon: FC<SvgProps>): ReactNode => (
  <Icon opacity={focused ? 1 : 0.5} />
)

const tabBarLabelRender = ({ focused }: { focused: boolean }, label: string): ReactNode => (
  <Text style={[styles.labelStyles, { color: focused ? Colors.primary : Colors.gunsmoke }]}>{label}</Text>
)

const MainTabsNavigator: FC = () => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const tabPadding = useMemo(() => (insets.bottom > 0 ? insets.bottom : Spacing.base), [insets])

  return (
    <Tab.Navigator tabBarOptions={{ style: { height: Metrics.bottomTab + tabPadding, paddingBottom: tabPadding } }}>
      <Tab.Screen
        name={Routes.HomeTab}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: (props) => tabBarIconRender(props, HomeIcon),
          tabBarLabel: (props) => tabBarLabelRender(props, t('tabs:home')),
        }}
      />
      <Tab.Screen
        name={Routes.OrdersTab}
        component={OrdersScreen}
        options={{
          tabBarIcon: (props) => tabBarIconRender(props, OrdersIcon),
          tabBarLabel: (props) => tabBarLabelRender(props, t('tabs:orders')),
        }}
      />
      <Tab.Screen
        name={Routes.PlacesTab}
        component={PlaceStackNavigator}
        options={{
          tabBarIcon: (props) => tabBarIconRender(props, FavoriteIcon),
          tabBarLabel: (props) => tabBarLabelRender(props, t('tabs:places')),
        }}
      />
      <Tab.Screen
        name={Routes.ProfileTab}
        component={AccountStackNavigator}
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

export default memo(MainTabsNavigator)
