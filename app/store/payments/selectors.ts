import { createSelector } from 'reselect'
import { RootState } from 'store'

export const cardsSelector = createSelector(
  (state: RootState) => state.payments,
  (payments) => payments.cards,
)
