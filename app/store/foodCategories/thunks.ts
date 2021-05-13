import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { FoodCategory } from './types'

export const getFoodCategories = createAsyncThunk<FoodCategory[]>('foodCategories/GET_FOOD_CATEGORIES', () =>
  api.getFoodCategories(),
)
