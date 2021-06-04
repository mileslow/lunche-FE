import { createSelector } from 'reselect'
import map from 'lodash.map'
import { RootState } from 'store'
import { TrucksSliceState } from './types'

export const trucksModelSelector = createSelector(
  (state: RootState) => state.trucks,
  (trucks: TrucksSliceState) => trucks,
)

export const truckSelector = createSelector(trucksModelSelector, (trucks: TrucksSliceState) => trucks.resource)

export const menuItemsSelector = createSelector(trucksModelSelector, (truck) => truck.menuItems)

export const truckCategoriesSelector = createSelector(truckSelector, (truck) =>
  map(truck.foodCategories, (i) => i.name),
)
