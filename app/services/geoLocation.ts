import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import Geolocation, { GeoError, GeoPosition } from 'react-native-geolocation-service'
import { PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions'
import some from 'lodash.some'

const hasLocationPermission: () => Promise<boolean> = async () => {
  const permissions = Platform.select({
    android: [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
    ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
    default: [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
  })

  const statuses = await requestMultiple(permissions)
  return some(permissions, (key) => statuses[key] === RESULTS.GRANTED)
}

export const getCurrentLocation: () => Promise<GeoPosition | null> = async () => {
  const isGranted = await hasLocationPermission()
  if (isGranted) {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      })
    })
  }
  return null
}

export const useGetCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] = useState<null | GeoPosition | { error: GeoError }>(null)

  useEffect(() => {
    getCurrentLocation()
      .then((position: GeoPosition | null) => {
        setCurrentPosition(position)
      })
      .catch((error: GeoError) => {
        setCurrentPosition({ error })
      })
  }, [])

  return currentPosition
}
