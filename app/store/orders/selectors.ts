import { createSelector } from 'reselect'
import { RootState } from 'store'
import { OrdersSliceState } from 'store/orders/types'

export const orderItemsSelector = createSelector(
  (state: RootState) => state.orders,
  (orders: OrdersSliceState) => orders.orderItems,
)
