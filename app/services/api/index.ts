// api
import auth from 'services/api/endpoints/auth'
import foodCategories from 'services/api/endpoints/foodCategories'
import trucks from 'services/api/endpoints/trucks'
import getFoodTypes from 'services/api/endpoints/getFoodTypes'
import mapBox from 'services/api/endpoints/mapBox'
import orders from 'services/api/endpoints/orders'
import favorites from 'services/api/endpoints/favorites'
import payments from 'services/api/endpoints/payments'

export default {
  ...auth,
  ...foodCategories,
  ...trucks,
  ...getFoodTypes,
  ...mapBox,
  ...orders,
  ...favorites,
  ...payments,
}
