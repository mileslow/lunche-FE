import React, { FC } from 'react'
// libs
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
// selectors
import { isAuthorizedSelector } from 'store/auth/selectors'
// navigation
import { Routes, RootNavigationStackParamsList } from 'navigation'
// screens
import SignInScreen from 'screens/SignInScreen'
import FavoritePlacesScreen from 'screens/FavoritePlacesScreen'

const Stack = createStackNavigator<RootNavigationStackParamsList>()

const PlaceStackNavigator: FC = () => {
  const isAuthorized = useSelector(isAuthorizedSelector)

  return (
    <Stack.Navigator headerMode='none'>
      {isAuthorized ? (
        <Stack.Screen name={Routes.FavoritePlacesScreen} component={FavoritePlacesScreen} />
      ) : (
        <Stack.Screen name={Routes.SignInScreen} component={SignInScreen} />
      )}
    </Stack.Navigator>
  )
}

export default PlaceStackNavigator
