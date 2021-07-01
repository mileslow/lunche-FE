import axios from 'services/api/axios'
import {
  SignInParams,
  SignInConfirmParams,
  Tokens,
  User,
  UpdateProfileData,
  UpdateProfileVerifyParams,
} from 'store/auth/types'

export default {
  signIn: (data: SignInParams): Promise<unknown> => axios.post('auth/sign-in/sms', data),
  signInConfirm: (data: SignInConfirmParams): Promise<Tokens> => axios.post('auth/sign-in/sms/confirm', data),
  getCurrentProfile: (): Promise<User> => axios.get('users/me'),
  updateCurrentProfile: (id: number, data: UpdateProfileData): Promise<User> => axios.put(`users/${id}`, data),
  updateProfileVerify: ({ id, code }: UpdateProfileVerifyParams): Promise<unknown> =>
    axios.post(`users/${id}/confirm-update`, { code }),
}
