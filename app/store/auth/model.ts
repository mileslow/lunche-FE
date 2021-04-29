// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// entities
import { AuthSliceState, User, Token } from 'store/auth/types'

const initialState: AuthSliceState = {
  token: null,
  user: null,
}

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthUser(state, { payload }: PayloadAction<User>): void {
      state.user = payload
    },
    updateAuthToken(state, { payload }: PayloadAction<Token>): void {
      state.token = payload
    },
    clearAuth(state): void {
      state.token = null
      state.user = null
    },
  },
})

export const sliceName = authSlice.name

export const { updateAuthUser, updateAuthToken, clearAuth } = authSlice.actions

export default authSlice.reducer
