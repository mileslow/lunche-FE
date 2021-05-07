import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// navigation
import { Routes, RootNavigationStackParamsList } from 'navigation'
// screens
import MainScreen from 'screens/MainScreen'

const Stack = createStackNavigator<RootNavigationStackParamsList>()

const MainStackNavigator: FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name={Routes.MainScreen} component={MainScreen} />
    </Stack.Navigator>
  )
}

export default MainStackNavigator
