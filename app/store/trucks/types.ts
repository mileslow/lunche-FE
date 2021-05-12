import { Meta } from 'services/api/types'
export type TrucksSliceState = {
  resources: Truck[]
  resource: Truck
  meta: Meta
}

export type Truck = {
  address: string
  createdAt: string
  distance: number
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
