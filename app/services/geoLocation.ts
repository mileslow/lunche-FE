import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import Geolocation, { GeoPosition } from 'react-native-geolocation-service'
import { PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions'
import some from 'lodash.some'
import api from 'services/api'

const hasLocationPermission: () => Promise<boolean> = async () => {
  const permissions = Platform.select({
    android: [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
    ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
    default: [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
  })

  const statuses = await requestMultiple(permissions)
  return some(permissions, (key) => statuses[key] === RESULTS.GRANTED)
}

const GEOLOCATION_CONFIG = {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 10000,
}
export const getCurrentLocation: (withAddress?: boolean) => Promise<CurrentLocation> = async (withAddress = false) => {
  const isGranted = await hasLocationPermission()
  return new Promise((resolve, reject) => {
    if (isGranted) {
      Geolocation.getCurrentPosition(
        (position: GeoPosition) => {
          const location: CurrentLocation = { lng: position.coords.longitude, lat: position.coords.latitude }
          if (withAddress) {
            api.geocode({ latitude: location.lat, longitude: location.lng }).then((result) => {
              resolve({ ...location, address: result.data?.features[0]?.text })
            })
            return
          }
          resolve(location)
        },
        reject,
        GEOLOCATION_CONFIG,
      )
    } else {
      reject('Permission to the location was denied')
    }
  })
}

export type CurrentLocation = { lng: number; lat: number; address?: string }
export const useGetCurrentPosition = (withAddress?: boolean) => {
  const [currentPosition, setCurrentPosition] = useState<CurrentLocation>()

  useEffect(() => {
    getCurrentLocation(withAddress).then((location: CurrentLocation) => {
      setCurrentPosition(location)
    })
  }, [withAddress])

  return currentPosition
}
