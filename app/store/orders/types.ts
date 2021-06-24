/* eslint-disable @typescript-eslint/naming-convention */
import { PaymentMethodType } from 'store/payments/types'

export enum DeliveryType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
}

export enum OrderStatus {
  DRAFT = 'draft',
  APPROVING = 'approving',
  COOKING = 'cooking',
  DELIVERING = 'delivering',
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
  orderItems: OrderItemsMap
}

export type OrderItemsMap = { [x: number]: PreSaveOrderItem }

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
  deliveryLatitude: number
  deliveryLongitude: number
  client: {
    name: string
    phone: string
    email: string
  }
  orderItems: OrderItem[]
  comment?: string
  deliveryQuoteId?: string
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

export type OrderItems = Array<OrderItem & { id: number; menuItem: { name: string; photo: string } }>

export type Order = {
  id: number
  totalSum: number
  orderSum: number
  totalFee: number
  type: DeliveryType
  foodTruck: {
    name: string
    mainPhoto: string
    address: string
    phone: string
    latitude: number
    longitude: number
    cookingTime: number
  }
  statusesStateMap: StatusesStateMap
  status: OrderStatus
  orderItems: OrderItems
  paymentMethod: PaymentMethodType
}

export type CreateDeliveryQuotesData = {
  foodTruckId: number
  deliveryAddress: string
  deliveryLongitude: number
  deliveryLatitude: number
  orderTime: string
}

export type Courier = {
  name: string
  phone_number: string
  location: {
    lat: number
    lng: number
  }
  img_href: string
}

export type DeliveryQuote = {
  created: string
  dropoff_eta: string | null
  courier: Courier
}

export type CreateDeliveryQuoteResponse = {
  id: string
  fee: number
}
