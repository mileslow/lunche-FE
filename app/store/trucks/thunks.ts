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

export const getTrucks = createAsyncThunk<DataWithMeta<Truck[]>, GetTrucksParams>('trucks/GET_TRUCKS', (params) =>
  api.getTrucks(params),
)

export const getTruck = createAsyncThunk<Truck, number>('trucks/GET_TRUCK', (id) => api.getTruck(id))

export const getTruckMenuItems = createAsyncThunk<MenuItem[], GetTruckMenuItemsParams>(
  'trucks/GET_TRUCK_MENU_ITEMS',
  (payload) => api.getTruckMenuItems(payload),
)

export const getTruckMenuItem = createAsyncThunk<MenuItemResource, GetTruckMenuItemParams>(
  'trucks/GET_TRUCK_MENU_ITEM',
  (payload) => api.getTruckMenuItem(payload),
)
