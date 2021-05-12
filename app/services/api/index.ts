// api
import auth from 'services/api/endpoints/auth'
import foodCategories from 'services/api/endpoints/foodCategories'

export default {
  ...auth,
  ...foodCategories,
}
