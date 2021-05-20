// api
import auth from 'services/api/endpoints/auth'
import foodCategories from 'services/api/endpoints/foodCategories'
import trucks from 'services/api/endpoints/trucks'
import getFoodTypes from 'services/api/endpoints/getFoodTypes'
import mapBox from 'services/api/endpoints/mapBox'

export default {
  ...auth,
  ...foodCategories,
  ...trucks,
  ...getFoodTypes,
  ...mapBox,
}
