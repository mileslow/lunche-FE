import { createSlice } from '@reduxjs/toolkit'
import omit from 'lodash.omit'
import { OrdersSliceState } from './types'

const initialState: OrdersSliceState = {
  orderItems: {},
}

// slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addItemToOrder: (state, { payload }) => {
      state.orderItems = { ...state.orderItems, [payload.menuItemId]: payload }
    },
    removeItemFromOrder: (state, { payload }) => {
      state.orderItems = omit(state.orderItems, payload)
    },
  },
})

export const sliceName = ordersSlice.name

export const { addItemToOrder, removeItemFromOrder } = ordersSlice.actions

export default ordersSlice.reducer
