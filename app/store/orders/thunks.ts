import { createAsyncThunk } from '@reduxjs/toolkit'
import map from 'lodash.map'
import pick from 'lodash.pick'
import api from 'services/api'
import { CreateOrderData, OrderItem, PaymentMethodType, CreateOrderResponse, Order } from './types'
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
      paymentMethod: PaymentMethodType.cash,
    }
    return api.createOrder(data)
  },
)

export const getOrders = createAsyncThunk<Order[]>('orders/GET_ORDERS', () => api.getOrders())
