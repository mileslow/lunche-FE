import round from 'lodash.round'
import { Linking } from 'react-native'

export const getImageBySize = (url: string, w: number, h: number) => {
  const lastIndex = url.lastIndexOf('/')
  const firstPart = url.substring(0, lastIndex)
  const lastPart = url.substring(lastIndex + 1)

  return `${firstPart}/${round(w)}x${round(h)}/${lastPart}`
}

export const onlyNumbers = (value: string) => value.replace(/[^\d]/g, '')

export const formatPhoneNumber = (phoneNumberString: string) => {
  const onlyNums = phoneNumberString.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}`
  }
  if (onlyNums.length <= 8) {
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)} - ${onlyNums.slice(6, 8)}`
  }
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)} - ${onlyNums.slice(6, 10)}`
}

export const openLink = async (url: string) => {
  const isCanOpen = await Linking.canOpenURL(url)
  if (isCanOpen) {
    Linking.openURL(url)
  }
}
