import { createSelector } from 'reselect'
import map from 'lodash.map'
import find from 'lodash.find'
import sumBy from 'lodash.sumby'
import round from 'lodash.round'
import { RootState } from 'store'
import { OrdersSliceState } from 'store/orders/types'

export const orderItemsSelector = createSelector(
  (state: RootState) => state.orders,
  (orders: OrdersSliceState) => orders.orderItems,
)

export const orderAmountSelector = createSelector(
  (state: RootState) => state.orders.orderItems,
  (state: RootState) => state.trucks.menuItems,
  (orderItems, menuItems) =>
    sumBy(
      map(orderItems, (item) => {
        const dish = find(menuItems, { id: item.menuItemId })
        return dish ? round(dish.price * item.itemCount, 2) : 0
      }),
    ),
)
