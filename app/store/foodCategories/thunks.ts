import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { FoodCategory } from './types'

export const getFoodCategories = createAsyncThunk<FoodCategory[]>(
  'events/getAllEvents',
  async (payload, { rejectWithValue }) => {
    try {
      return await api.getFoodCategories()
    } catch (err) {
      return rejectWithValue({ ...err, status: err.response?.status, message: err.message })
    }
  },
)
