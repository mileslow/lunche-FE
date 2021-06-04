import axios from 'services/api/axios'
import { FavoriteResponse } from 'store/favorites/types'

export default {
  createFavorite: (id: number): Promise<FavoriteResponse> => axios.post(`favorites/food-trucks/${id}`),
  removeFavorite: (id: number): Promise<FavoriteResponse> => axios.delete(`favorites/food-trucks/${id}`),
}
