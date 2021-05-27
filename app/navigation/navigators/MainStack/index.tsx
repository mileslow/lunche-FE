import React, { memo, useEffect, useState } from 'react'
// libs
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
// components
import Spinner from 'components/Spinner'
// screens
import WelcomeScreen from 'screens/WelcomeScreen'
// navigations
import MainTabsNavigator from 'navigation/navigators/MainTabs'
import Routes from 'navigation/routes'
// store
import { AppDispatch } from 'store'
import { setShowWelcome } from 'store/general/model'
import { isShowWelcomeSelector } from 'store/general/selectors'
// utils
import { getSkipWelcome } from 'services/storage'
// types
import { MainNavigationStackParamsList } from './types'
import CartScreen from 'screens/CartScreen'
import TruckScreen from 'screens/TruckScreen'
import AboutTruckScreen from 'screens/AboutTruckScreen'

const MainStack = createStackNavigator<MainNavigationStackParamsList>()

const MainStackNavigator = () => {
  const [isLoading, setLoading] = useState<boolean>(true)

  const isShowWelcome = useSelector(isShowWelcomeSelector)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true)
      const isSkipWelcome = await getSkipWelcome()
      dispatch(setShowWelcome(!isSkipWelcome))
      setLoading(false)
    }
    bootstrap()
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <MainStack.Navigator headerMode='none'>
      {isShowWelcome ? (
        <MainStack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />
      ) : (
        <>
          <MainStack.Screen name={Routes.MainTabsStack} component={MainTabsNavigator} />
          <MainStack.Screen name={Routes.CartScreen} component={CartScreen} />
          <MainStack.Screen name={Routes.TruckScreen} component={TruckScreen} />
          <MainStack.Screen name={Routes.AboutTruckScreen} component={AboutTruckScreen} />
        </>
      )}
    </MainStack.Navigator>
  )
}

export default memo(MainStackNavigator)
