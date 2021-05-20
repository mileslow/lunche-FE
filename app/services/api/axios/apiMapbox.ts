import axios from 'axios'
import ENV from 'react-native-config'

const apiMapbox = axios.create({
  baseURL: ENV.BASE_MAP_BOX_URL,
  params: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    access_token: ENV.MAP_BOX_ACCESS_TOKEN,
  },
})

export default apiMapbox
