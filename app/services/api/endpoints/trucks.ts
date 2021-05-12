import axios from 'services/api/axios'
import { DataWithMeta } from 'services/api/types'
import { Truck } from 'store/trucks/types'

export default {
  getTrucks: (): Promise<DataWithMeta<Truck[]>> => axios.get('/food-trucks'),
  getTruck: (id: number): Promise<Truck> => axios.get(`/food-trucks/${id}`),
}
