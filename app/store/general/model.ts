import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GeneralSliceState } from './types'

const initialState: GeneralSliceState = {
  isShowWelcome: false,
}

// slice
const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setShowWelcome: (state, { payload }: PayloadAction<boolean>) => {
      state.isShowWelcome = payload
    },
  },
})

export const sliceName = generalSlice.name

export const { setShowWelcome } = generalSlice.actions

export default generalSlice.reducer
