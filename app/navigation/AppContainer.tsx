import React, { FC } from 'react'
import { StatusBar } from 'react-native'
// navigations
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// navigators
import MainStackNavigator from 'navigation/navigators/MainStack'
import DishModal from 'screens/DishModal'
// routs
import Routes from 'navigation/routes'

const RootStack = createStackNavigator()

const AppNavigationContainer: FC = () => {
  return (
    <>
      <StatusBar backgroundColor='transparent' networkActivityIndicatorVisible translucent />

      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
          mode='modal'
        >
          <RootStack.Screen name={Routes.RootNavigator} component={MainStackNavigator} />
          <RootStack.Screen name={Routes.DishModal} component={DishModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AppNavigationContainer
