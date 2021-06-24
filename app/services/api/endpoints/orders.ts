import axios from 'services/api/axios'
import {
  CreateOrderData,
  CreateOrderResponse,
  Order,
  CreateDeliveryQuotesData,
  DeliveryQuote,
  CreateDeliveryQuoteResponse,
} from 'store/orders/types'

export default {
  createOrder: (data: CreateOrderData): Promise<CreateOrderResponse> => axios.post('/orders', data),
  getOrders: (): Promise<Order[]> => axios.get('/orders'),
  getOrder: (id: number): Promise<Order> => axios.get(`/orders/${id}`),
  getOrderDelivery: (id: number): Promise<DeliveryQuote> => axios.get(`/orders/${id}/delivery`),
  createDeliveryQuotes: (data: CreateDeliveryQuotesData): Promise<CreateDeliveryQuoteResponse> =>
    axios.post(`/delivery-quotes`, data),
}
