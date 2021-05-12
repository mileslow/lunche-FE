import { createSlice } from '@reduxjs/toolkit'
import { Truck, TrucksSliceState } from 'store/trucks/types'
import { getTrucks, getTruck } from 'store/trucks/thunks'

const initialState: TrucksSliceState = {
  resources: [],
  resource: {} as Truck,
  meta: {
    total: 0,
    count: 0,
    page: 1,
    pageCount: 1,
  },
}

// slice
const foodCategoriesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  },
})

export const sliceName = foodCategoriesSlice.name

export default foodCategoriesSlice.reducer
