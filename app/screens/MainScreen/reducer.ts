import { Truck, TrucksFilters, GetTrucksParams } from 'store/trucks/types'
import { useReducer } from 'react'
import { Meta, DataWithMeta } from 'services/api/types'

type LocalState = {
  loading: { isLoadingLocation: boolean; isLoadingTruck: boolean }
  filters: TrucksFilters
  trucks: Truck[]
  meta: Meta
}

export enum ActionType {
  FetchingTruckFulfilled = 'FetchingTruckFulfilled',
  SetLoadingTruck = 'SetLoadingTruck',
  SetLoadingLocation = 'SetLoadingLocation',
  FetchingTruckPending = 'FetchingTruckPending',
}

type Action =
  | { type: ActionType.FetchingTruckFulfilled; payload: DataWithMeta<Truck[]> }
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
  meta: {} as Meta,
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
    case ActionType.FetchingTruckFulfilled:
      return {
        ...state,
        trucks: action.payload.page === 1 ? action.payload.data : [...state.trucks, ...action.payload.data],
        meta: {
          total: action.payload.total,
          count: action.payload.count,
          page: action.payload.page,
          pageCount: action.payload.pageCount,
        },
        loading: { ...state.loading, isLoadingTruck: false },
      }
    case ActionType.SetLoadingTruck:
      return { ...state, loading: { ...state.loading, isLoadingTruck: action.payload } }
    case ActionType.SetLoadingLocation:
      return { ...state, loading: { ...state.loading, isLoadingLocation: action.payload } }
    default:
      return state
  }
}

export const useMainScreenReducer = () => useReducer(reducer, initialState)
