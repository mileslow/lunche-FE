import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// navigation
import { Routes, RootNavigationStackParamsList } from 'navigation'
// screens
import TmpIndexScreen from 'screens/TMP/Index'
import TmpNestedScreen from 'screens/TMP/Nested'

const Stack = createStackNavigator<RootNavigationStackParamsList>()

const ExmapleStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.ExampleStackIndex} component={TmpIndexScreen} />
      <Stack.Screen
        name={Routes.ExampleStackChild}
        component={TmpNestedScreen}
        initialParams={{
          payload: 'Initial payload',
        }}
      />
    </Stack.Navigator>
  )
}

export default ExmapleStackNavigator
