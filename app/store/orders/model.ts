import { createSlice } from '@reduxjs/toolkit'
import { OrdersSliceState } from './types'

const initialState: OrdersSliceState = {
  orderItems: [],
}

// slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
})

export const sliceName = ordersSlice.name

// export const { } = ordersSlice.actions

export default ordersSlice.reducer
