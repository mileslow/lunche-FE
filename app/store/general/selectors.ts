import { createSelector } from 'reselect'
import { RootState } from 'store'
import { GeneralSliceState } from './types'

export const isShowWelcomeSelector = createSelector(
  (state: RootState) => state.general,
  (general: GeneralSliceState) => general.isShowWelcome,
)

export const currentAddressSelector = createSelector(
  (state: RootState) => state.general,
  (general: GeneralSliceState) => general.currentPosition?.address,
)

export const currentCountrySelector = createSelector(
  (state: RootState) => state.general,
  (general: GeneralSliceState) => general.currentPosition?.country,
)

export const currentPositionSelector = createSelector(
  (state: RootState) => state.general,
  (general: GeneralSliceState) => general.currentPosition,
)
