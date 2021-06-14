import React, { FC } from 'react'
import { StatusBar } from 'react-native'
// navigations
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// navigators
import MainStackNavigator from 'navigation/navigators/MainStack'
import DishModal from 'screens/DishModal'
import ChangeAddressModal from 'screens/ChangeAddressModal'
import CardModal from 'screens/CardModal'
// routs
import Routes from 'navigation/routes'
import { modalCardStyleInterpolator } from 'navigation/utils'

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
            cardStyleInterpolator: modalCardStyleInterpolator,
          }}
          mode='modal'
        >
          <RootStack.Screen name={Routes.RootNavigator} component={MainStackNavigator} />
          <RootStack.Screen name={Routes.DishModal} component={DishModal} />
          <RootStack.Screen name={Routes.ChangeAddressModal} component={ChangeAddressModal} />
          <RootStack.Screen name={Routes.CardModal} component={CardModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AppNavigationContainer
