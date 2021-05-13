import axios from 'services/api/axios'
import { DataWithMeta } from 'services/api/types'
import { Truck, GetTrucksParams, MenuItem, GetTruckMenuItemsParams } from 'store/trucks/types'

export default {
  getTrucks: (params: GetTrucksParams): Promise<DataWithMeta<Truck[]>> => axios.get('/food-trucks', { params }),
  getTruck: (id: number): Promise<Truck> => axios.get(`/food-trucks/${id}`),
  getTruckMenuItems: ({ id, params }: GetTruckMenuItemsParams): Promise<MenuItem[]> =>
    axios.get(`/food-trucks/${id}/menu-items`, { params }),
}
