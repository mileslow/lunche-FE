export type OrdersSliceState = {
  orderItems: OrderItem[]
}

export type OrderItem = {
  menuItemId: number
  itemCount: number
}
