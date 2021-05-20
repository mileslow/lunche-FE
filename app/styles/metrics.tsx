import { Dimensions } from 'react-native'

const WINDOW = Dimensions.get('window')

const Metrics = {
  header: 56,
  truckListImgWidth: 343,
  truckListImgHeight: 144,
  truckImgWidth: 375,
  truckImgHeight: 280,
  menuItemSize: 122,
  foodItemSize: 140,
  windowHeight: WINDOW.height,
  windowWidth: WINDOW.width,
}

export default Metrics
