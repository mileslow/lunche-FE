import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { PaymentParams, GetCreditCardResponse, AddCreditCardResponse, CreatePaymentResponse } from './types'
import { RootState } from 'store'

export const createPayment = createAsyncThunk<
  CreatePaymentResponse,
  { id: number; params?: PaymentParams },
  { state: RootState }
>('payments/CREATE_PAYMENT', (payload) => api.createPayment(payload.id, payload.params))

export const getCreditCards = createAsyncThunk<GetCreditCardResponse, undefined, { state: RootState }>(
  'payments/GET_CREDIT_CARDS',
  () => api.getCreditCards(),
)

export const addCreditCard = createAsyncThunk<AddCreditCardResponse, undefined, { state: RootState }>(
  'payments/ADD_CREDIT_CARD',
  () => api.addCreditCard(),
)

export const deleteCreditCard = createAsyncThunk<unknown, number>('payments/DELETE_CREDIT_CARD', (id) =>
  api.deleteCreditCard(id),
)
