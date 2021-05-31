import AsyncStorage from '@react-native-async-storage/async-storage'
import { CurrentLocation } from 'services/geoLocation'

export const getAuthToken = async () => await AsyncStorage.getItem('auth_token')

export const getSkipWelcome = async () => {
  const isSkip = await AsyncStorage.getItem('is_skip_welcome')
  return isSkip === 'true'
}

export const setSkipWelcome = async (value: boolean) => {
  await AsyncStorage.setItem('is_skip_welcome', value ? 'true' : 'false')
}

export const setRecentSearch = async (locations: CurrentLocation[]) => {
  await AsyncStorage.setItem('recent_search', JSON.stringify(locations))
}

export const getRecentSearch = async (): Promise<CurrentLocation[]> => {
  const locations = await AsyncStorage.getItem('recent_search')
  return JSON.parse(locations || '')
}
