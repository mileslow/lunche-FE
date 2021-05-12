import axios from 'services/api/axios'

export default {
  signIn: (data: any): Promise<any> => axios.post('auth/login/email', data),
}
