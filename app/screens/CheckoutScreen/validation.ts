import * as yup from 'yup'
// localization
import i18n from 'services/localization'
import { DeliveryType } from 'store/orders/types'

const requiredDependType = (compareType: keyof typeof DeliveryType) =>
  yup.string().when('type', {
    is: (type: keyof typeof DeliveryType) => type === compareType,
    then: yup.string().required(i18n.t('validation:required')),
  })

export const schemaValidation = yup
  .object()
  .shape({
    client: yup.object({
      email: yup.string().email(i18n.t('validation:invalidEmail')).required(i18n.t('validation:required')),
      name: yup.string().required(i18n.t('validation:required')),
      phone: yup.string().required(i18n.t('validation:required')),
    }),
    deliveryAddress: requiredDependType(DeliveryType.delivery),
    deliveryDate: requiredDependType(DeliveryType.delivery),
    pickupTime: requiredDependType(DeliveryType.pickup),
  })
  .defined()
