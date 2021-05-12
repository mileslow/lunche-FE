import axios from 'services/api/axios'
import { FoodCategory } from 'store/foodCategories/types'

export default {
  getFoodCategories: (): Promise<FoodCategory[]> => axios.get('/food-categories'),
}
