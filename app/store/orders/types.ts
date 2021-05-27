export type OrdersSliceState = {
  comment: string
  orderItems: OrderItems
}

export type OrderItems = { [x: number]: PreSaveOrderItem }

export type OrderItem = {
  menuItemId: number
  itemCount: number
}

export type PreSaveOrderItem = OrderItem & { price: number; name: string }
