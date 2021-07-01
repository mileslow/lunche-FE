// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// libs
import omitBy from 'lodash.omitby'
import isNull from 'lodash.isnull'
// entities
import { AuthSliceState, User } from 'store/auth/types'
// thunks
import { signInConfirm, getCurrentProfile, updateCurrentProfile } from 'store/auth/thunks'

const initialState: AuthSliceState = {
  user: null,
  isAuthorized: false,
}

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthorized = payload
    },
    clearAuth: (state) => {
      state.isAuthorized = false
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInConfirm.fulfilled, (state) => {
      state.isAuthorized = true
    })
    builder.addCase(getCurrentProfile.fulfilled, (state, { payload }: PayloadAction<User>) => {
      state.user = omitBy(payload, isNull) as User
    })
    builder.addCase(updateCurrentProfile.fulfilled, (state, { payload }: PayloadAction<User>) => {
      state.user = omitBy(payload, isNull) as User
    })
  },
})

export const sliceName = authSlice.name

export const { setAuthorized, clearAuth } = authSlice.actions

export default authSlice.reducer
