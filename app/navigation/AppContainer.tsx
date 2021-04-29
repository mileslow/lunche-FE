import React, { FC } from 'react'
import { StatusBar } from 'react-native'
// navigations
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// navigators
import HomeNavigator from 'navigation/navigators/HomeTabs'

const RootStack = createStackNavigator()

const AppNavigationContainer: FC = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" networkActivityIndicatorVisible translucent />

      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AppNavigationContainer
