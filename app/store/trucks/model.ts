import { createSlice } from '@reduxjs/toolkit'
import { Truck, TrucksSliceState } from 'store/trucks/types'
import { getTruck, getTruckMenuItems } from 'store/trucks/thunks'
import { createFavorite, removeFavorite } from 'store/favorites/thunks'
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
      .addCase(createFavorite.fulfilled, (state, { meta }) => {
        if (state.resource.id === meta.arg) {
          state.resource.isFavorite = true
        }
      })
      .addCase(removeFavorite.fulfilled, (state, { meta }) => {
        if (state.resource.id === meta.arg) {
          state.resource.isFavorite = false
        }
      })
  },
})

export const sliceName = trucksSlice.name

export default trucksSlice.reducer
