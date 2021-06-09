export type AuthSliceState = {
  token: Token | null
  user: User | null
  isAuthorized: boolean
}

export type Token = string

export type User = {
  id: number
  name: string
  email: string
  phone: string
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
