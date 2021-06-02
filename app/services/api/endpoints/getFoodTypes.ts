import axios from 'services/api/axios'
import { FoodType } from 'store/foodTypes/types'

export default {
  getFoodTypes: (truckId: number): Promise<FoodType[]> => axios.get(`/food-trucks/${truckId}/food-types`),
}
