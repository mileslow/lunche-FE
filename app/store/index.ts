import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from 'store/rootReducer'

const flipperMiddleware = () => {
  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const createDebugger = require('redux-flipper').default
    return createDebugger()
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(flipperMiddleware()),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
