import axios from 'services/api/axios'
import { CreateOrderData, CreateOrderResponse } from 'store/orders/types'

export default {
  createOrder: (data: CreateOrderData): Promise<CreateOrderResponse> => axios.post('/orders', data),
}
