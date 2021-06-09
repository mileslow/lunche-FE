import axios from 'services/api/axios'
import { CreateOrderData, CreateOrderResponse, Order } from 'store/orders/types'

export default {
  createOrder: (data: CreateOrderData): Promise<CreateOrderResponse> => axios.post('/orders', data),
  getOrders: (): Promise<Order[]> => axios.get('/orders'),
}
