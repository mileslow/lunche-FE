export type AuthSliceState = {
  token: Token | null
  user: User | null
}

export type Token = string

export type User = {
  id: number
  email: string | null
  provider: string
  socialId?: string | null
  firstName: string | null
  lastName: string | null
}
