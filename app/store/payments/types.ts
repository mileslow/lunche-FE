import { Card } from '@stripe/stripe-react-native'

export enum PaymentMethodType {
  cash = 'cash',
  card = 'card',
}

export enum PaymentBrand {
  visa = 'visa',
  mastercard = 'mastercard',
  applePay = 'applePay',
}

export type PaymentBrandType = PaymentBrand | Card.Brand | string

export type PaymentType = {
  paymentMethod?: PaymentMethodType
  cardId?: number
  brand?: PaymentBrandType
  lastFourNumbers?: string
}

export type PaymentParams = {
  cardId?: number
  saveCard?: boolean
}

export type CreditCard = {
  id: number
  lastFourNumbers: string
  brand: PaymentBrandType
}

export type GetCreditCardResponse = CreditCard[]

export type PaymentsSliceState = {
  cards: CreditCard[]
}

export type AddCreditCardResponse = {
  clientSecret: string
  cardId: number
}

export type CreatePaymentResponse = {
  clientSecret: string
}
