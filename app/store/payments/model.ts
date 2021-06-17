import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCreditCards } from './thunks'
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
  },
})

export const sliceName = paymentsSlice.name

export const { addCard } = paymentsSlice.actions

export default paymentsSlice.reducer
