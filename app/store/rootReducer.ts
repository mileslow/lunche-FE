// redux
import { combineReducers } from '@reduxjs/toolkit'
// reducers
import auth from 'store/auth/model'
import foodCategories from 'store/foodCategories/model'

const rootReducer = combineReducers({
  auth,
  foodCategories,
})

export default rootReducer
