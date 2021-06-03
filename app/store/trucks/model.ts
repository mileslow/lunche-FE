import { createSlice } from '@reduxjs/toolkit'
import { Truck, TrucksSliceState } from 'store/trucks/types'
import { getTruck, getTruckMenuItems } from 'store/trucks/thunks'
import { clearTruckScreen } from 'store/commonActions'

const initialState: TrucksSliceState = {
  resource: {
    mainPhoto: '',
  } as Truck,
  menuItems: [],
}

// slice
const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearTruckScreen, (state) => {
        state.resource = initialState.resource
        state.menuItems = initialState.menuItems
      })
      .addCase(getTruck.fulfilled, (state, { payload }) => {
        state.resource = payload
      })
      .addCase(getTruckMenuItems.fulfilled, (state, { payload }) => {
        state.menuItems = payload
      })
  },
})

export const sliceName = trucksSlice.name

export default trucksSlice.reducer
