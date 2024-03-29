import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import reject from 'lodash.reject'
import { deleteCreditCard, getCreditCards } from './thunks'
import { PaymentsSliceState, CreditCard } from './types'

const initialState: PaymentsSliceState = {
  cards: [],
}

// slice
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    addCard: (state, { payload }: PayloadAction<CreditCard>) => {
      state.cards = [...state.cards, payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCreditCards.fulfilled, (state, { payload }: PayloadAction<CreditCard[]>) => {
      state.cards = payload
    })
    builder.addCase(deleteCreditCard.fulfilled, (state, { meta }) => {
      state.cards = reject(state.cards, { id: meta.arg })
    })
  },
})

export const sliceName = paymentsSlice.name

export const { addCard } = paymentsSlice.actions

export default paymentsSlice.reducer
