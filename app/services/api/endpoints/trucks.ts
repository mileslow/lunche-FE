import axios from 'services/api/axios'
import { DataWithMeta } from 'services/api/types'
import { Truck, GetTrucksParams } from 'store/trucks/types'

export default {
  getTrucks: (params: GetTrucksParams): Promise<DataWithMeta<Truck[]>> => axios.get('/food-trucks', { params }),
  getTruck: (id: number): Promise<Truck> => axios.get(`/food-trucks/${id}`),
}
