import { CurrentLocation } from 'services/geoLocation'

export type GeneralSliceState = {
  isShowWelcome: boolean
  currentPosition: CurrentLocation | null
}
