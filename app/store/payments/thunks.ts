import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { PaymentParams, GetCreditCardResponse, AddCreditCardResponse } from './types'
import { RootState } from 'store'

export const createPayment = createAsyncThunk<unknown, { id: number; params?: PaymentParams }, { state: RootState }>(
  'payments/CREATE_PAYMENT',
  (payload) => api.createPayment(payload.id, payload.params),
)

export const getCreditCards = createAsyncThunk<GetCreditCardResponse, { id: number }, { state: RootState }>(
  'payments/GET_CREDIT_CARDS',
  (payload) => api.getCreditCards(payload.id),
)

export const addCreditCard = createAsyncThunk<AddCreditCardResponse, { id: number }, { state: RootState }>(
  'payments/ADD_CREDIT_CARD',
  (payload) => api.addCreditCard(payload.id),
)
