import React, { memo, useEffect, useState } from 'react'
// libs
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
import allsettled from 'promise.allsettled'
// components
import Spinner from 'components/Spinner'
// screens
import WelcomeScreen from 'screens/WelcomeScreen'
import CartScreen from 'screens/CartScreen'
import TruckScreen from 'screens/TruckScreen'
import AboutTruckScreen from 'screens/AboutTruckScreen'
import CheckoutScreen from 'screens/CheckoutScreen'
import SignInScreen from 'screens/SignInScreen'
import VerifyCodeScreen from 'screens/VerifyCodeScreen'
import SearchTruckModal from 'screens/SearchTruckModal'
import OrderTrackerScreen from 'screens/OrderTrackerScreen'
import ProfileDetailsScreen from 'screens/ProfileDetailsScreen'
import LocationsScreen from 'screens/LocationsScreen'
import CreditCardsScreen from 'screens/CreditCardsScreen'
// navigations
import MainTabsNavigator from 'navigation/navigators/MainTabs'
import Routes from 'navigation/routes'
import { modalCardStyleInterpolator } from 'navigation/utils'
// store
import { AppDispatch } from 'store'
import { setAuthorized } from 'store/auth/model'
import { setShowWelcome } from 'store/general/model'
import { isShowWelcomeSelector } from 'store/general/selectors'
// utils
import { getAuthToken, getSkipWelcome } from 'services/storage'
// types
import { MainNavigationStackParamsList } from './types'
import { Colors } from 'styles'
import PaymentScreen from 'screens/PaymentScreen'
import { getCurrentProfile } from 'store/auth/thunks'

const MainStack = createStackNavigator<MainNavigationStackParamsList>()

const MainStackNavigator = () => {
  const [isLoading, setLoading] = useState<boolean>(true)

  const isShowWelcome = useSelector(isShowWelcomeSelector)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true)
      const [isSkipWelcome, token] = await allsettled([getSkipWelcome(), getAuthToken(), dispatch(getCurrentProfile())])
      dispatch(setAuthorized(token.status === 'fulfilled' && !!token.value))
      dispatch(setShowWelcome(isSkipWelcome.status === 'fulfilled' && !isSkipWelcome.value))
      setLoading(false)
    }
    bootstrap()
  }, [dispatch])

  if (isLoading) {
    return <Spinner style={{ backgroundColor: Colors.basic }} />
  }

  return (
    <MainStack.Navigator
      headerMode='none'
      screenOptions={({ route }) =>
        route.name === Routes.SearchTruckModal ? { cardStyleInterpolator: modalCardStyleInterpolator } : {}
      }
    >
      {isShowWelcome ? (
        <MainStack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />
      ) : (
        <>
          <MainStack.Screen name={Routes.MainTabsStack} component={MainTabsNavigator} />
          <MainStack.Screen name={Routes.CartScreen} component={CartScreen} />
          <MainStack.Screen name={Routes.TruckScreen} component={TruckScreen} />
          <MainStack.Screen name={Routes.AboutTruckScreen} component={AboutTruckScreen} />
          <MainStack.Screen name={Routes.CheckoutScreen} component={CheckoutScreen} />
          <MainStack.Screen name={Routes.SignInScreen} component={SignInScreen} />
          <MainStack.Screen name={Routes.VerifyCodeScreen} component={VerifyCodeScreen} />
          <MainStack.Screen name={Routes.PaymentScreen} component={PaymentScreen} />
          <MainStack.Screen name={Routes.SearchTruckModal} component={SearchTruckModal} />
          <MainStack.Screen name={Routes.OrderTrackerScreen} component={OrderTrackerScreen} />
          <MainStack.Screen name={Routes.ProfileDetailsScreen} component={ProfileDetailsScreen} />
          <MainStack.Screen name={Routes.LocationsScreen} component={LocationsScreen} />
          <MainStack.Screen name={Routes.CreditCardsScreen} component={CreditCardsScreen} />
        </>
      )}
    </MainStack.Navigator>
  )
}

export default memo(MainStackNavigator)
