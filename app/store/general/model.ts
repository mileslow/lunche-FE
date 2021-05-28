import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentLocation } from 'services/geoLocation'
import { GeneralSliceState } from './types'

const initialState: GeneralSliceState = {
  isShowWelcome: false,
  currentPosition: null,
}

// slice
const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setShowWelcome: (state, { payload }: PayloadAction<boolean>) => {
      state.isShowWelcome = payload
    },
    setCurrentPosition: (state, { payload }: PayloadAction<CurrentLocation>) => {
      state.currentPosition = payload
    },
  },
})

export const sliceName = generalSlice.name

export const { setShowWelcome, setCurrentPosition } = generalSlice.actions

export default generalSlice.reducer
