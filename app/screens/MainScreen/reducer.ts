import { Truck, TrucksFilters, GetTrucksParams } from 'store/trucks/types'
import { useReducer } from 'react'

type LocalState = {
  loading: { isLoadingLocation: boolean; isLoadingTruck: boolean }
  filters: TrucksFilters
  trucks: Truck[]
}

export enum ActionType {
  FetchingTruckFullfilled = 'FetchingTruckFullfilled',
  SetLoadingTruck = 'SetLoadingTruck',
  SetLoadingLocation = 'SetLoadingLocation',
  FetchingTruckPending = 'FetchingTruckPending',
}

type Action =
  | { type: ActionType.FetchingTruckFullfilled; payload: Truck[] }
  | { type: ActionType.FetchingTruckPending; payload: GetTrucksParams }
  | { type: ActionType.SetLoadingTruck; payload: boolean }
  | { type: ActionType.SetLoadingLocation; payload: boolean }

const initialState: LocalState = {
  loading: {
    isLoadingLocation: false,
    isLoadingTruck: false,
  },
  filters: {
    foodCategoryIds: [],
    supportDelivery: false,
  },
  trucks: [],
}

const reducer = (state: LocalState, action: Action): LocalState => {
  switch (action.type) {
    case ActionType.FetchingTruckPending: {
      const newFilters = action.payload ?? {}
      return {
        ...state,
        filters: { ...state.filters, ...newFilters },
        loading: { ...state.loading, isLoadingTruck: true },
      }
    }
    case ActionType.FetchingTruckFullfilled:
      return { ...state, trucks: action.payload, loading: { ...state.loading, isLoadingTruck: false } }
    case ActionType.SetLoadingTruck:
      return { ...state, loading: { ...state.loading, isLoadingTruck: action.payload } }
    case ActionType.SetLoadingLocation:
      return { ...state, loading: { ...state.loading, isLoadingLocation: action.payload } }
    default:
      return state
  }
}

export const useMainScreenReducer = () => useReducer(reducer, initialState)
