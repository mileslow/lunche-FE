import { createSelector } from 'reselect'
import map from 'lodash.map'
import { RootState } from 'store'
import { TrucksSliceState } from './types'

export const trucksSelector = createSelector(
  (state: RootState) => state.trucks,
  (trucks: TrucksSliceState) => trucks.resources,
)

export const truckSelector = createSelector(
  (state: RootState) => state.trucks,
  (trucks: TrucksSliceState) => trucks.resource,
)

export const truckCategoriesSelector = createSelector(truckSelector, (truck) =>
  map(truck.foodCategories, (i) => i.name),
)
