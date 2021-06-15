// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// libs
import omitBy from 'lodash.omitby'
import isNull from 'lodash.isnull'
// entities
import { AuthSliceState, User } from 'store/auth/types'
// thunks
import { signInConfirm, getCurrentProfile } from 'store/auth/thunks'

const initialState: AuthSliceState = {
  token: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(signInConfirm.fulfilled, (state) => {
      state.isAuthorized = true
    })
    builder.addCase(getCurrentProfile.fulfilled, (state, { payload }: PayloadAction<User>) => {
      state.user = omitBy(payload, isNull) as User
    })
  },
})

export const sliceName = authSlice.name

export const { setAuthorized } = authSlice.actions

export default authSlice.reducer
