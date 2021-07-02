import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  SignInParams,
  SignInConfirmParams,
  Tokens,
  User,
  UpdateProfileData,
  UpdateProfileVerifyParams,
  UserLocation,
  AddLocationData,
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

export const addLocation = createAsyncThunk<UserLocation, { id: number; data: AddLocationData }>(
  'auth/ADD_LOCATION',
  ({ id, data }) => api.addLocation(id, data),
)

export const deleteLocation = createAsyncThunk<UserLocation, { id: number; userId: number }>(
  'auth/DELETE_LOCATION',
  (payload) => api.deleteLocation(payload),
)
