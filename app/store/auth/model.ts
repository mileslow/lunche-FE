// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// entities
import { AuthSliceState } from 'store/auth/types'
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
    builder.addCase(getCurrentProfile.fulfilled, (state, { payload }) => {
      state.user = payload
    })
  },
})

export const sliceName = authSlice.name

export const { setAuthorized } = authSlice.actions

export default authSlice.reducer
