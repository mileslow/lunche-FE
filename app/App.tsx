import React, { FC } from 'react'
import { AppNavigationContainer } from 'navigation'
import { Provider as StoreProvider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { StripeProvider } from '@stripe/stripe-react-native'
import Config from 'react-native-config'
import store from 'store'
import i18n from './services/localization'

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <StripeProvider publishableKey={Config.STRIPE_KEY} merchantIdentifier='merchant.com.lunche'>
          <AppNavigationContainer />
        </StripeProvider>
      </I18nextProvider>
    </StoreProvider>
  )
}

export default App
