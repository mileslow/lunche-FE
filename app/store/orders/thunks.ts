import { createAsyncThunk } from '@reduxjs/toolkit'
import map from 'lodash.map'
import pick from 'lodash.pick'
import api from 'services/api'
import { CreateOrderData, OrderItem, CreateOrderResponse, Order, DeliveryQuote } from './types'
import { ICreateOrderFormData } from 'screens/CheckoutScreen'
import { RootState } from 'store'

export const createOrder = createAsyncThunk<CreateOrderResponse, ICreateOrderFormData, { state: RootState }>(
  'orders/CREATE_ORDER',
  (payload, { getState }) => {
    const orderItems: OrderItem[] = map(getState().orders.orderItems, (item) => pick(item, ['itemCount', 'menuItemId']))
    const comment = getState().orders.comment

    const data: CreateOrderData = {
      ...payload,
      orderItems,
      comment,
    }
    return api.createOrder(data)
  },
)

export const getOrders = createAsyncThunk<Order[]>('orders/GET_ORDERS', () => api.getOrders())

export const getOrder = createAsyncThunk<Order, number>('orders/GET_ORDER', (payload) => api.getOrder(payload))

export const getOrderDelivery = createAsyncThunk<DeliveryQuote, number>('orders/GET_ORDER_DELIVERY', (payload) =>
  api.getOrderDelivery(payload),
)
