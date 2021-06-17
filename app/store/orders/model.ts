import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import omit from 'lodash.omit'
import { OrdersSliceState, PreSaveOrderItem } from './types'

const initialState: OrdersSliceState = {
  comment: '',
  orderItems: {},
}

// slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addItemToOrder: (state, { payload }: PayloadAction<PreSaveOrderItem>) => {
      state.orderItems = { ...state.orderItems, [payload.menuItemId]: payload }
    },
    removeItemFromOrder: (state, { payload }: PayloadAction<number>) => {
      state.orderItems = omit(state.orderItems, payload)
    },
    changeComment: (state, { payload }: PayloadAction<string>) => {
      state.comment = payload
    },
    clearOrderItems: (state) => {
      state.orderItems = {}
    },
  },
})

export const sliceName = ordersSlice.name

export const { addItemToOrder, removeItemFromOrder, changeComment, clearOrderItems } = ordersSlice.actions

export default ordersSlice.reducer
