import { Alert } from 'react-native'
import axios, { AxiosRequestConfig } from 'axios'
// constants
import Config from 'react-native-config'
import debounce from 'lodash.debounce'
// services
import { getAuthToken, getRefreshToken, setAuthData } from 'services/storage'
// localization
import i18n from 'services/localization'

export const isAuth = (config: AxiosRequestConfig): boolean => config?.params?.isAuth || true

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
    if (isAuth(config)) {
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
  async (originalError = {}) => {
    const { response, message, config } = originalError
    const data = response?.data
    const status = response?.status as number
    if (status === 401 && !config._retry && !config.url.includes('refresh-session')) {
      config._retry = true
      const refreshToken = await getRefreshToken()

      return axiosInstance
        .post<{ refreshToken: string }, { accessToken: string; refreshToken: string }>('/auth/refresh-token', {
          refreshToken,
        })
        .then(async (refreshResult) => {
          config.headers.Authorization = `Bearer ${refreshResult.accessToken}`
          await setAuthData({ accessToken: refreshResult.accessToken, refreshToken: refreshResult.refreshToken })
          return axios(config)
        })
        .catch(async (err) => {
          if (err.config.url.includes('refresh-session')) {
            return Promise.reject(originalError)
          }
          return Promise.reject(err)
        })
    }

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
