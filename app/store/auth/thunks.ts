import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  SignInParams,
  SignInConfirmParams,
  Tokens,
  User,
  UpdateProfileData,
  UpdateProfileVerifyParams,
} from 'store/auth/types'
import api from 'services/api'

export const signIn = createAsyncThunk<unknown, SignInParams>('auth/SING_IN', (payload) => api.signIn(payload))

export const signInConfirm = createAsyncThunk<Tokens, SignInConfirmParams>('auth/SING_IN_CONFIRM', (payload) =>
  api.signInConfirm(payload),
)

export const getCurrentProfile = createAsyncThunk<User>('auth/GET_CURRENT_PROFILE', () => api.getCurrentProfile())

export const updateCurrentProfile = createAsyncThunk<User, { id: number; data: UpdateProfileData }>(
  'auth/UPDATE_CURRENT_PROFILE',
  ({ id, data }) => api.updateCurrentProfile(id, data),
)

export const updateProfileVerify = createAsyncThunk<unknown, UpdateProfileVerifyParams>(
  'auth/UPDATE_PROFILE_VERIFY',
  (payload) => api.updateProfileVerify(payload),
)
