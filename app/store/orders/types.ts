import { PaymentMethodType } from 'store/payments/types'

export enum DeliveryType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
}

export enum OrderStatus {
  DRAFT = 'draft',
  APPROVING = 'approving',
  COOKING = 'cooking',
  READY = 'ready',
  REJECTED = 'rejected',
}

export enum StatusesState {
  DONE = 'done',
  CURRENT = 'current',
  WAITING = 'waiting',
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
  type: DeliveryType
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

export type StatusesStateMap = {
  [x in typeof OrderStatus[keyof typeof OrderStatus]]: StatusesState
}

export type Order = {
  id: number
  totalSum: number
  totalFee: number
  foodTruck: {
    name: string
    mainPhoto: string
    address: string
    phone: string
    latitude: number
    longitude: number
  }
  statusesStateMap: StatusesStateMap
  status: OrderStatus
  orderItems: Array<OrderItem & { id: number; menuItem: { name: string; photo: string } }>
  paymentMethod: PaymentMethodType
}
