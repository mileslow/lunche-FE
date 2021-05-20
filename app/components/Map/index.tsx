import React, { FC, memo, useMemo } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import ENV from 'react-native-config'

MapboxGL.setAccessToken(ENV.MAP_BOX_ACCESS_TOKEN)

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

interface IProps {
  style: ViewStyle
  zoomLevel?: number
  location?: { lng: number; lat: number }
}

const Map: FC<IProps> = ({ style, zoomLevel, location }) => {
  const centerCoordinate = useMemo(() => (location ? [location.lng, location.lat] : undefined), [location])

  return (
    <View style={style}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={zoomLevel} centerCoordinate={centerCoordinate} />
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>
    </View>
  )
}

export default memo(Map)
