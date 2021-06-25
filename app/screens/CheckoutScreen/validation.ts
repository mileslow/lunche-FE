import * as yup from 'yup'
// localization
import i18n from 'services/localization'
import { DeliveryType } from 'store/orders/types'

const requiredForUnAuthorized = (field: yup.StringSchema) =>
  yup.string().when('$isAuthorized', {
    is: false,
    then: field.required(i18n.t('validation:required')),
  })

export const schemaValidation = yup
  .object()
  .shape({
    client: yup.object({
      email: requiredForUnAuthorized(yup.string().email(i18n.t('validation:invalidEmail'))),
      name: requiredForUnAuthorized(yup.string()),
      phone: requiredForUnAuthorized(yup.string()),
    }),
    deliveryAddress: yup.object().when('type', {
      is: (type: DeliveryType) => type === DeliveryType.DELIVERY,
      then: yup.object({
        address: yup.string().required(i18n.t('validation:required')),
        lng: yup.string().required(i18n.t('validation:required')),
        lat: yup.string().required(i18n.t('validation:required')),
      }),
    }),
    paymentMethod: yup.string().required(i18n.t('validation:required')),
  })
  .defined()
