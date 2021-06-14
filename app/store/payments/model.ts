import { createSlice } from '@reduxjs/toolkit'
import { getCreditCards } from './thunks'
import { PaymentsSliceState } from './types'

const initialState: PaymentsSliceState = {
  cards: [],
}

// slice
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCreditCards.fulfilled, (state, { payload }) => {
      state.cards = payload
    })
  },
})

export const sliceName = paymentsSlice.name

export default paymentsSlice.reducer
