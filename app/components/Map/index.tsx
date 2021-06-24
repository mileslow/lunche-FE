import React, { FC, memo, ReactNode, useMemo } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import MapboxGL, { Logger, PointAnnotationProps } from '@react-native-mapbox-gl/maps'
import ENV from 'react-native-config'

MapboxGL.setAccessToken(ENV.MAP_BOX_ACCESS_TOKEN)

Logger.setLogCallback((log) => {
  const { message } = log

  return (
    message.includes('Request failed due to a permanent error: Canceled') ||
    message.includes('Request failed due to a permanent error: Socket Closed')
  )
})

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

interface IProps {
  style: ViewStyle
  zoomLevel?: number
  isShowUserLocation?: boolean
  location?: { lng: number; lat: number }
  children?: ReactNode
}

const Map: FC<IProps> = ({ style, zoomLevel, location, isShowUserLocation, children }) => {
  const centerCoordinate = useMemo(() => (location ? [location.lng, location.lat] : undefined), [location])

  return (
    <View style={style}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={zoomLevel} centerCoordinate={centerCoordinate} />
        {isShowUserLocation && <MapboxGL.UserLocation />}
        {children}
      </MapboxGL.MapView>
    </View>
  )
}

export const PointAnnotation = ({
  children,
  coordinate,
  title,
  id,
}: PointAnnotationProps & { children: ReactNode }) => (
  <MapboxGL.PointAnnotation id={id} coordinate={coordinate} title={title}>
    {children}
  </MapboxGL.PointAnnotation>
)

export default memo(Map)
