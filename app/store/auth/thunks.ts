import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'services/api'

export const signIn = createAsyncThunk<any, any, any>('auth/SING_IN', async (payload: any) => {
  const response = await api.signIn(payload)
  return response.data
})
