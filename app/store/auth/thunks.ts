import { createAsyncThunk } from '@reduxjs/toolkit'
import { SignInParams, SignInConfirmParams, Tokens, User } from 'store/auth/types'
import api from 'services/api'

export const signIn = createAsyncThunk<unknown, SignInParams>('auth/SING_IN', (payload) => api.signIn(payload))

export const signInConfirm = createAsyncThunk<Tokens, SignInConfirmParams>('auth/SING_IN_CONFIRM', (payload) =>
  api.signInConfirm(payload),
)

export const getCurrentProfile = createAsyncThunk<User>('auth/GET_CURRENT_PROFILE', () => api.getCurrentProfile())
