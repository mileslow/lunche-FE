import axios from 'services/api/axios'
import { FoodType } from 'store/foodTypes/types'

export default {
  getFoodTypes: (): Promise<FoodType[]> => axios.get('/food-types'),
}
