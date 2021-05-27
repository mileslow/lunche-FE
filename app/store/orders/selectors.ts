import { createSelector } from 'reselect'
import map from 'lodash.map'
import find from 'lodash.find'
import sumBy from 'lodash.sumby'
import round from 'lodash.round'
import { RootState } from 'store'
import { OrdersSliceState } from 'store/orders/types'

export const ordersSelector = createSelector(
  (state: RootState) => state.orders,
  (orders) => orders,
)

export const orderItemsSelector = createSelector(ordersSelector, (orders: OrdersSliceState) => orders.orderItems)

export const orderAmountSelector = createSelector(
  (state: RootState) => state.orders.orderItems,
  (state: RootState) => state.trucks.menuItems,
  (orderItems, menuItems) =>
    round(
      sumBy(
        map(orderItems, (item) => {
          const dish = find(menuItems, { id: item.menuItemId })
          return dish ? dish.price * item.itemCount : 0
        }),
      ),
      2,
    ),
)

export const commentOrderSelector = createSelector(ordersSelector, (orders) => orders.comment)
