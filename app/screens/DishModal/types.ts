import { MenuItemResource } from 'store/trucks/types'

export type LocalState = {
  isLoading: boolean
  dish: MenuItemResource
  itemCount: number
}

export type Action =
  | { type: ActionType.SetLoading; payload: boolean }
  | { type: ActionType.GetMenuItemFulfilled; payload: MenuItemResource }
  | { type: ActionType.IncrementCount }
  | { type: ActionType.DecrementCount }

export enum ActionType {
  SetLoading = 'SetLoading',
  GetMenuItemFulfilled = 'GetMenuItemFulfilled',
  IncrementCount = 'IncrementCount',
  DecrementCount = 'DecrementCount',
}
