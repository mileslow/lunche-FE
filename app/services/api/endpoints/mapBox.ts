import apiMapbox from 'services/api/axios/apiMapbox'

export default {
  geocode: (coords: {
    longitude: number
    latitude: number
  }): Promise<{ data: { features: Array<{ text: string }> } }> =>
    apiMapbox.get(`/mapbox.places/${coords.longitude},${coords.latitude}.json`, {
      params: { ...apiMapbox.defaults.params, types: ['address'] },
    }),
}
