import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAuthToken = async () => await AsyncStorage.getItem('auth_token')

export const getSkipWelcome = async () => {
  const isSkip = await AsyncStorage.getItem('is_skip_welcome')
  return isSkip === 'true'
}

export const setSkipWelcome = async (value: boolean) => {
  await AsyncStorage.setItem('is_skip_welcome', value ? 'true' : 'false')
}
