import { PaymentMethodType } from 'store/payments/types'

export enum DeliveryType {
  delivery = 'delivery',
  pickup = 'pickup',
}

export enum OrderStatus {
  Draft = 'draft',
  Approving = 'approving',
  Cooking = 'cooking',
  Ready = 'ready',
  Rejected = 'rejected',
}

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
  data: {
    id: number
    client: {
      phone: string
    }
    orderSum: number
    paymentMethod: PaymentMethodType
  }
}

export type Order = {
  id: number
  totalSum: number
  foodTruck: {
    name: string
    mainPhoto: string
  }
  status: OrderStatus
  orderItems: Array<OrderItem & { menuItem: { name: string } }>
}
