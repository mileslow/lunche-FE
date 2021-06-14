import axios from 'services/api/axios'
import { PaymentParams, GetCreditCardResponse, AddCreditCardResponse } from 'store/payments/types'

export default {
  createPayment: (id: number, params?: PaymentParams): Promise<unknown> =>
    axios.post(`/orders/${id}/pay`, null, { params }),
  getCreditCards: (id: number): Promise<GetCreditCardResponse> => axios.get(`/users/${id}/payment-cards`),
  addCreditCard: (id: number): Promise<AddCreditCardResponse> => axios.post(`/users/${id}/payment-cards`),
}
