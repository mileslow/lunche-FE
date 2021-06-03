import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { DataWithMeta } from 'services/api/types'
import {
  Truck,
  GetTrucksParams,
  MenuItem,
  GetTruckMenuItemsParams,
  GetTruckMenuItemParams,
  MenuItemResource,
} from './types'
import { RootState } from 'store'

export const getTrucks = createAsyncThunk<DataWithMeta<Truck[]>, GetTrucksParams>('trucks/GET_TRUCKS', (params) =>
  api.getTrucks(params),
)

export const getTruck = createAsyncThunk<Truck, number, { state: RootState }>(
  'trucks/GET_TRUCK',
  async (id, { getState }) => {
    const currentPosition = getState().general.currentPosition
    return await api.getTruck({ id, params: { latitude: currentPosition?.lat, longitude: currentPosition?.lng } })
  },
)

export const getTruckMenuItems = createAsyncThunk<MenuItem[], GetTruckMenuItemsParams>(
  'trucks/GET_TRUCK_MENU_ITEMS',
  (payload) => api.getTruckMenuItems(payload),
)

export const getTruckMenuItem = createAsyncThunk<MenuItemResource, GetTruckMenuItemParams>(
  'trucks/GET_TRUCK_MENU_ITEM',
  (payload) => api.getTruckMenuItem(payload),
)
