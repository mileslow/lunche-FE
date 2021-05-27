// redux
import { combineReducers } from '@reduxjs/toolkit'
// reducers
import auth from 'store/auth/model'
import foodCategories from 'store/foodCategories/model'
import trucks from 'store/trucks/model'
import foodTypes from 'store/foodTypes/model'
import general from 'store/general/model'
import orders from 'store/orders/model'

const rootReducer = combineReducers({
  auth,
  foodCategories,
  trucks,
  foodTypes,
  general,
  orders,
})

export default rootReducer
