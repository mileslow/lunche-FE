export type OrdersSliceState = {
  orderItems: OrderItems
}

export type OrderItems = { [x: number]: OrderItem }

export type OrderItem = {
  menuItemId: number
  itemCount: number
}
