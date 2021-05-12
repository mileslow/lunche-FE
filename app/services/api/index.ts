// api
import auth from 'services/api/endpoints/auth'
import foodCategories from 'services/api/endpoints/foodCategories'
import trucks from 'services/api/endpoints/trucks'

export default {
  ...auth,
  ...foodCategories,
  ...trucks,
}
