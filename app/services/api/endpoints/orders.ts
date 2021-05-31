import axios from 'services/api/axios'
import { CreateOrderData } from 'store/orders/types'

export default {
  createOrder: (data: CreateOrderData): Promise<unknown> => axios.post('/orders', data),
}
