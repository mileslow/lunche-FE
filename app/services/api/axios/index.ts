import { Alert } from 'react-native'
import axios, { AxiosRequestConfig } from 'axios'
// constants
import Config from 'react-native-config'
import debounce from 'lodash.debounce'
// services
import { getAuthToken } from 'services/storage'
// localization
import i18n from 'services/localization'

export const handlerEnabled = (config: AxiosRequestConfig): boolean => {
  return config?.params?.handlerEnabled || true
}

export const showErrorAlert = debounce((title: string, message?: string) => {
  Alert.alert(title, message, [{ text: 'OK' }], {
    cancelable: false,
  })
}, 500)

// create axios instance
const axiosInstance = axios.create({
  baseURL: Config.BASE_API_URL,
})

/* request interceptor */
axiosInstance.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    if (handlerEnabled(config)) {
      const authToken = await getAuthToken()

      config.headers.authorization = `Bearer ${authToken || ''}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

/* response interceptor */
axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (responseData = {}) => {
    const { response, message } = responseData
    const data = response?.data
    const status = response?.status as number

    if (status >= 500) {
      showErrorAlert(
        i18n.t('errors:serverError'),
        i18n.t('errors:statusCode', {
          code: status.toString() || 'N/A',
        }),
      )
    }

    return Promise.reject({
      data,
      message,
      status,
    })
  },
)

export default axiosInstance
