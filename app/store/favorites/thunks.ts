import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'
import { FavoriteResponse } from './types'
import { RootState } from 'store'

export const createFavorite = createAsyncThunk<FavoriteResponse, number, { state: RootState }>(
  'favorites/CREATE_FAVORITES',
  (payload) => api.createFavorite(payload),
)

export const removeFavorite = createAsyncThunk<FavoriteResponse, number, { state: RootState }>(
  'favorites/REMOVE_FAVORITES',
  (payload) => api.removeFavorite(payload),
)
