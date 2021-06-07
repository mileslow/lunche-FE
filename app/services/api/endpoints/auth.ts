import axios from 'services/api/axios'
import { SignInParams, SignInConfirmParams, Tokens, User } from 'store/auth/types'

export default {
  signIn: (data: SignInParams): Promise<unknown> => axios.post('auth/sign-in/sms', data),
  signInConfirm: (data: SignInConfirmParams): Promise<Tokens> => axios.post('auth/sign-in/sms/confirm', data),
  getCurrentProfile: (): Promise<User> => axios.get('users/me'),
}
