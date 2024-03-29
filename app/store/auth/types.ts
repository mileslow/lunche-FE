export type AuthSliceState = {
  user: User | null
  isAuthorized: boolean
}

export type Token = string

export type UserLocation = {
  id: number
  latitude: number
  longitude: number
  address: string
}

export type User = {
  id: number
  name: string
  email: string
  phone: string
  locations: UserLocation[]
}

export type SignInParams = {
  phone: string
}

export type SignInConfirmParams = {
  code: string
  phone: string
}

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type UpdateProfileData = {
  name?: string
  email?: string
  phone?: string
}

export type UpdateProfileVerifyParams = {
  id: number
  code: string
}

export type AddLocationData = Omit<UserLocation, 'id'>
