import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// navigation
import { Routes, RootNavigationStackParamsList } from 'navigation'
// screens
import MainScreen from 'screens/MainScreen'
import TruckScreen from 'screens/TruckScreen'

const Stack = createStackNavigator<RootNavigationStackParamsList>()

const MainStackNavigator: FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name={Routes.MainScreen} component={MainScreen} />
      <Stack.Screen name={Routes.TruckScreen} component={TruckScreen} />
    </Stack.Navigator>
  )
}

export default MainStackNavigator
