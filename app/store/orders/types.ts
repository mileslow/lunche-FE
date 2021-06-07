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

export enum DeliveryType {
  delivery = 'delivery',
  pickup = 'pickup',
}

export enum PaymentMethodType {
  cash = 'cash',
  card = 'card',
}

export type CreateOrderData = {
  type: keyof typeof DeliveryType
  paymentMethod: keyof typeof PaymentMethodType
  orderTime: string
  deliveryAddress: string
  client: {
    name: string
    phone: string
    email: string
  }
  orderItems: OrderItem[]
  comment?: string
}

export type CreateOrderResponse = {
  metadata: {
    tokens: {
      accessToken: string
      refreshToken: string
    }
  }
  [x: string]: unknown
}
