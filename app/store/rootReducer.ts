// redux
import { combineReducers } from '@reduxjs/toolkit'
// reducers
import auth from 'store/auth/model'

const rootReducer = combineReducers({
  auth,
})

export default rootReducer
