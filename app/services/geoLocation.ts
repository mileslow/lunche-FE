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

export const getCurrentLocation: () => Promise<GeoPosition> = async () => {
  const isGranted = await hasLocationPermission()
  return new Promise((resolve, reject) => {
    if (isGranted) {
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      })
    } else {
      reject('Permission to the location was denied')
    }
  })
}

type CurrentLocation = { lng: number; lat: number; address?: string }
export const useGetCurrentPosition = (withAddress = false) => {
  const [currentPosition, setCurrentPosition] = useState<CurrentLocation>()

  useEffect(() => {
    getCurrentLocation().then(async (position) => {
      let location: CurrentLocation = { lng: position.coords.longitude, lat: position.coords.latitude }
      if (withAddress) {
        const result = await api.geocode({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        location = { ...location, address: result.data?.features[0]?.text }
      }
      setCurrentPosition(location)
    })
  }, [withAddress])

  return currentPosition
}
