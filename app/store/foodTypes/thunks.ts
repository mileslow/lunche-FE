import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { FoodType } from './types'

export const getFoodTypes = createAsyncThunk<FoodType[]>('foodTypes/GET_FOOD_TYPES', () => api.getFoodTypes())
