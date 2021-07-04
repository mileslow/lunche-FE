import axios from 'services/api/axios'
import {
  PaymentParams,
  GetCreditCardResponse,
  AddCreditCardResponse,
  CreatePaymentResponse,
} from 'store/payments/types'

export default {
  createPayment: (id: number, params?: PaymentParams): Promise<CreatePaymentResponse> =>
    axios.post(`/orders/${id}/pay`, null, { params }),
  getCreditCards: (): Promise<GetCreditCardResponse> => axios.get(`/payment-cards`),
  addCreditCard: (): Promise<AddCreditCardResponse> => axios.post(`/payment-cards`),
  deleteCreditCard: (id: number): Promise<unknown> => axios.delete(`/payment-cards/${id}`),
}
