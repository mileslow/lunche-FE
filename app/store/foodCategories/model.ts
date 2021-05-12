import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FoodCategoriesSliceState, FoodCategory } from 'store/foodCategories/types'
import { getFoodCategories } from 'store/foodCategories/thunks'

const initialState: FoodCategoriesSliceState = {
  resources: [],
}

// slice
const foodCategoriesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getFoodCategories.fulfilled,
      (state: FoodCategoriesSliceState, { payload }: PayloadAction<FoodCategory[]>) => {
        state.resources = payload
      },
    )
  },
})

export const sliceName = foodCategoriesSlice.name

// export const {} = foodCategoriesSlice.actions

export default foodCategoriesSlice.reducer
