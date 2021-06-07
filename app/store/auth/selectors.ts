import { createSelector } from 'reselect'
import { RootState } from 'store'

export const isAuthorizedSelector = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.isAuthorized,
)

export const currentProfileSelector = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user,
)
