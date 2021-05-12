import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// navigation
import { Routes, RootNavigationStackParamsList } from 'navigation'
// screens
import MainScreen from 'screens/MainScreen'
import TruckScreen from 'screens/TruckScreen'
import AboutTruckScreen from 'screens/AboutTruckScreen'

const Stack = createStackNavigator<RootNavigationStackParamsList>()

const MainStackNavigator: FC = () => {
  return (
    <Stack.Navigator headerMode='none' initialRouteName={Routes.AboutTruckScreen}>
      <Stack.Screen name={Routes.MainScreen} component={MainScreen} />
      <Stack.Screen name={Routes.TruckScreen} component={TruckScreen} />
      <Stack.Screen name={Routes.AboutTruckScreen} component={AboutTruckScreen} />
    </Stack.Navigator>
  )
}

export default MainStackNavigator
