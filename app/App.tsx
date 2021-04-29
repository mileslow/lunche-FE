import React, { FC } from 'react'
import { AppNavigationContainer } from 'navigation'
import { Provider as StoreProvider } from 'react-redux'
import store from 'store'
import { I18nextProvider } from 'react-i18next'
import i18n from './services/localization'

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppNavigationContainer />
      </I18nextProvider>
    </StoreProvider>
  )
}

export default App
