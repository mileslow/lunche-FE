// redux
import { combineReducers } from '@reduxjs/toolkit'
// reducers
import auth, { clearAuth } from 'store/auth/model'
import foodCategories from 'store/foodCategories/model'
import trucks from 'store/trucks/model'
import foodTypes from 'store/foodTypes/model'
import general from 'store/general/model'
import orders from 'store/orders/model'
import payments from 'store/payments/model'

const combineReducer = combineReducers({
  auth,
  foodCategories,
  trucks,
  foodTypes,
  general,
  orders,
  payments,
})

const rootReducer: typeof combineReducer = (state, action) => {
  if (action.type === clearAuth.type) {
    return combineReducer(undefined, action)
  }

  return combineReducer(state, action)
}
export default rootReducer
