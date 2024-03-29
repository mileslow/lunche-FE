import { createSlice } from '@reduxjs/toolkit'
import { FootTypesSliceState } from 'store/foodTypes/types'
import { getFoodTypes } from 'store/foodTypes/thunks'
import { clearTruckScreen } from 'store/commonActions'

const initialState: FootTypesSliceState = {
  resources: [],
}

// slice
const footTypesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearTruckScreen, (state) => {
        state.resources = initialState.resources
      })
      .addCase(getFoodTypes.fulfilled, (state, { payload }) => {
        state.resources = payload
      })
  },
})

export const sliceName = footTypesSlice.name

export default footTypesSlice.reducer
