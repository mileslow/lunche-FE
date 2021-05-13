import { createSelector } from 'reselect'
import { RootState } from 'store'
import { FootTypesSliceState } from './types'

export const foodTypesSelector = createSelector(
  (state: RootState) => state.foodTypes,
  (foodTypes: FootTypesSliceState) => foodTypes.resources,
)
