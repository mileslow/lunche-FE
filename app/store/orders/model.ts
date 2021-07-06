import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import omit from 'lodash.omit'
import { NotPayedOrder, OrdersSliceState, PreSaveOrderItem } from './types'

const initialState: OrdersSliceState = {
  comment: '',
  orderItems: {},
  notPayedOrder: null,
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
      state.comment = ''
      state.notPayedOrder = null
    },
    setNotPayedOrder: (state, { payload }: PayloadAction<NotPayedOrder | null>) => {
      state.notPayedOrder = payload
    },
  },
})

export const sliceName = ordersSlice.name

export const {
  addItemToOrder,
  removeItemFromOrder,
  changeComment,
  clearOrderItems,
  setNotPayedOrder,
} = ordersSlice.actions

export default ordersSlice.reducer
