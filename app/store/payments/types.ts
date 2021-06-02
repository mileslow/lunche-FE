export type PaymentParams = {
  cardId?: number
  saveCard?: boolean
}

export type CreditCard = {
  id: number
  lastFourNumbers: string
  brand: 'visa' | 'mastercard'
}

export type GetCreditCardResponse = CreditCard[]

export type PaymentsSliceState = {
  cards: CreditCard[]
}

export type AddCreditCardResponse = {
  clientSecret: string
}
