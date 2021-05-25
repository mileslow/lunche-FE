import axios from 'services/api/axios'
import { DataWithMeta } from 'services/api/types'
import {
  Truck,
  GetTrucksParams,
  MenuItem,
  GetTruckMenuItemsParams,
  GetTruckMenuItemParams,
  MenuItemResource,
} from 'store/trucks/types'

export default {
  getTrucks: (params: GetTrucksParams): Promise<DataWithMeta<Truck[]>> => axios.get('/food-trucks', { params }),
  getTruck: (id: number): Promise<Truck> => axios.get(`/food-trucks/${id}`),
  getTruckMenuItems: ({ id, params }: GetTruckMenuItemsParams): Promise<MenuItem[]> =>
    axios.get(`/food-trucks/${id}/menu-items`, { params }),
  getTruckMenuItem: ({ id, truckId }: GetTruckMenuItemParams): Promise<MenuItemResource> =>
    axios.get(`/food-trucks/${truckId}/menu-items/${id}`),
}
