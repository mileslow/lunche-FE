import { FoodType } from 'store/foodTypes/types'

export type TrucksSliceState = {
  resource: Truck
  menuItems: MenuItem[]
}

export type Truck = {
  address: string
  createdAt: string
  distance: number
  isFavorite: boolean
  foodCategories: Array<{
    createdAt: string
    icon: string
    id: number
    name: string
    updatedAt: string
  }>
  id: number
  latitude: number
  longitude: number
  mainPhoto: string
  name: string
  phone: string
  photos: string[]
  rating: number
  supportDelivery: boolean
  updatedAt: string
  scheduleItems: Array<{
    id: number
    dayOfWeek: number
    to: string
    from: string
  }>
}

export type MenuItem = {
  id: number
  name: string
  photo: string
  description: string
  price: number
  createdAt: string
  updatedAt: string
  foodTypes: FoodType[]
}

export type MenuItemResource = {
  id: number
  name: string
  photo: string
  description: string
  price: number
}

export type TrucksFilters = {
  latitude?: number
  longitude?: number
  supportDelivery?: boolean
  foodCategoryIds?: number[]
  search?: string
  onlyFavorite?: boolean
}

export type GetTrucksParams = TrucksFilters | undefined

export type GetTruckMenuItemsParams = { id: number; params?: { foodTypeIds?: number[] } }

export type GetTruckMenuItemParams = { id: number; truckId: number }

export type GetTruckParams = { longitude?: number; latitude?: number }
