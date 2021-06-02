import { createSlice } from '@reduxjs/toolkit'
import { Truck, TrucksSliceState } from 'store/trucks/types'
import { getTrucks, getTruck, getTruckMenuItems } from 'store/trucks/thunks'
import { clearTruckScreen } from 'store/commonActions'

const initialState: TrucksSliceState = {
  resources: [],
  resource: {
    mainPhoto: '',
  } as Truck,
  filters: {
    foodCategoryIds: [],
    supportDelivery: false,
  },
  meta: {
    total: 0,
    count: 0,
    page: 1,
    pageCount: 1,
  },
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
      .addCase(getTrucks.pending, (state, { meta }) => {
        state.filters = meta.arg ? meta.arg : initialState.filters
      })
      .addCase(getTrucks.fulfilled, (state, { payload }) => {
        state.resources = payload.data
        state.meta = {
          total: payload.total,
          count: payload.count,
          page: payload.page,
          pageCount: payload.pageCount,
        }
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
