import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'store/rootReducer'
// import { Middleware } from 'redux'

// const middlewares = []
// if (__DEV__) {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const createDebugger = require('redux-flipper').default
//   middlewares.push(createDebugger() as Middleware)
// }

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware().concat(middlewares),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
