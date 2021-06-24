import * as yup from 'yup'
// localization
import i18n from 'services/localization'
import { DeliveryType } from 'store/orders/types'

const requiredDependType = (compareType: DeliveryType) =>
  yup.string().when('type', {
    is: (type: DeliveryType) => type === compareType,
    then: yup.string().required(i18n.t('validation:required')),
  })

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
    deliveryAddress: yup.object({
      address: requiredDependType(DeliveryType.DELIVERY),
      lng: requiredDependType(DeliveryType.DELIVERY),
      lat: requiredDependType(DeliveryType.DELIVERY),
    }),
    paymentMethod: yup.string().required(i18n.t('validation:required')),
  })
  .defined()
