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

export const currentUserIdSelector = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user?.id,
)

export const savedLocationsSelector = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user?.locations ?? [],
)
