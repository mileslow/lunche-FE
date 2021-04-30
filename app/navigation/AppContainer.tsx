import React, { FC } from 'react'
import { StatusBar } from 'react-native'
// navigations
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// navigators
import MainTabsNavigator from 'navigation/navigators/MainTabs'

const RootStack = createStackNavigator()

const AppNavigationContainer: FC = () => {
  return (
    <>
      <StatusBar backgroundColor='transparent' networkActivityIndicatorVisible translucent />

      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name='RootNavigator' component={MainTabsNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AppNavigationContainer
