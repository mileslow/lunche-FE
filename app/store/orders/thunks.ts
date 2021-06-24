import { createAsyncThunk } from '@reduxjs/toolkit'
import map from 'lodash.map'
import pick from 'lodash.pick'
import api from 'services/api'
import {
  CreateOrderData,
  OrderItem,
  CreateOrderResponse,
  Order,
  DeliveryQuote,
  CreateDeliveryQuotesData,
  CreateDeliveryQuoteResponse,
} from './types'
import { ICreateOrderFormData } from 'screens/CheckoutScreen'
import { RootState } from 'store'

export const createOrder = createAsyncThunk<
  CreateOrderResponse,
  ICreateOrderFormData & { deliveryQuoteId?: string },
  { state: RootState }
>('orders/CREATE_ORDER', (payload, { getState }) => {
  const orderItems: OrderItem[] = map(getState().orders.orderItems, (item) => pick(item, ['itemCount', 'menuItemId']))
  const comment = getState().orders.comment

  const data: CreateOrderData = {
    ...payload,
    deliveryAddress: payload.deliveryAddress.address,
    deliveryLatitude: payload.deliveryAddress.lat,
    deliveryLongitude: payload.deliveryAddress.lng,
    orderItems,
    comment,
  }
  return api.createOrder(data)
})

export const getOrders = createAsyncThunk<Order[]>('orders/GET_ORDERS', () => api.getOrders())

export const getOrder = createAsyncThunk<Order, number>('orders/GET_ORDER', (payload) => api.getOrder(payload))

export const getOrderDelivery = createAsyncThunk<DeliveryQuote, number>('orders/GET_ORDER_DELIVERY', (payload) =>
  api.getOrderDelivery(payload),
)

export const createDeliveryQuotes = createAsyncThunk<CreateDeliveryQuoteResponse, CreateDeliveryQuotesData>(
  'orders/CREATE_ORDER_DELIVERY',
  (payload) => api.createDeliveryQuotes(payload),
)
