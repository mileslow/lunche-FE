import apiMapbox from 'services/api/axios/apiMapbox'

export type LocationType = {
  id: string
  address: string
  text: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  place_name: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  context: Array<{ id: string; short_code: string; text: string }>
  geometry: {
    coordinates: number[]
  }
}

export default {
  geocode: (coords: { longitude: number; latitude: number }): Promise<{ data: { features: LocationType[] } }> =>
    apiMapbox.get(`/mapbox.places/${coords.longitude},${coords.latitude}.json?`, {
      params: { ...apiMapbox.defaults.params, types: ['address', 'poi', 'place'] },
    }),
  search: (searchText: string): Promise<{ data: { features: LocationType[] } }> =>
    apiMapbox.get(`/mapbox.places/${searchText}.json`, {
      params: { ...apiMapbox.defaults.params, types: ['address'], autocomplete: true, limit: 10 },
    }),
}
