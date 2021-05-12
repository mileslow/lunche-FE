import { createSelector } from 'reselect'
import { RootState } from 'store'
import { FoodCategoriesSliceState } from './types'

export const foodCategoriesSelector = createSelector(
  (state: RootState) => state.foodCategories,
  (foodCategories: FoodCategoriesSliceState) => foodCategories.resources,
)
