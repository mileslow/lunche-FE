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
import AccountScreen from 'screens/AccountScreen'

const Stack = createStackNavigator<RootNavigationStackParamsList>()

const AccountStackNavigator: FC = () => {
  const isAuthorized = useSelector(isAuthorizedSelector)

  return (
    <Stack.Navigator headerMode='none'>
      {isAuthorized ? (
        <Stack.Screen name={Routes.AccountScreen} component={AccountScreen} />
      ) : (
        <Stack.Screen name={Routes.SignInScreen} component={SignInScreen} />
      )}
    </Stack.Navigator>
  )
}

export default AccountStackNavigator
