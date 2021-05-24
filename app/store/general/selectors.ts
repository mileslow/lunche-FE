import { createSelector } from 'reselect'
import { RootState } from 'store'
import { GeneralSliceState } from './types'

export const isShowWelcomeSelector = createSelector(
  (state: RootState) => state.general,
  (general: GeneralSliceState) => general.isShowWelcome,
)
