import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { DataWithMeta } from 'services/api/types'
import { Truck } from './types'

export const getTrucks = createAsyncThunk<DataWithMeta<Truck[]>>('trucks/GET_TRUCKS', () => api.getTrucks())

export const getTruck = createAsyncThunk<Truck, number>('trucks/GET_TRUCK', (id) => api.getTruck(id))
