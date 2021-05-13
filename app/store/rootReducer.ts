// redux
import { combineReducers } from '@reduxjs/toolkit'
// reducers
import auth from 'store/auth/model'
import foodCategories from 'store/foodCategories/model'
import trucks from 'store/trucks/model'
import foodTypes from 'store/foodTypes/model'

const rootReducer = combineReducers({
  auth,
  foodCategories,
  trucks,
  foodTypes,
})

export default rootReducer
