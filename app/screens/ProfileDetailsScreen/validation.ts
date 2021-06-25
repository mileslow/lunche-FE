import * as yup from 'yup'
// localization
import i18n from 'services/localization'

export const schemaValidation = yup
  .object()
  .shape({
    client: yup.object({
      email: yup.string().email(i18n.t('validation:invalidEmail')),
      phone: yup.string().required(i18n.t('validation:required')),
    }),
  })
  .defined()
