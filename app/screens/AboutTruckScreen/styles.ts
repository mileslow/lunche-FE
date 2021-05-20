import { StyleSheet } from 'react-native'
import { TRUCK_IMAGE_HEIGHT } from 'screens/TruckScreen/styles'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  truckImage: {
    height: TRUCK_IMAGE_HEIGHT,
  },
  carouselPagination: {
    bottom: 0,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.double,
    position: 'absolute',
    right: 0,
  },
  carouselDot: {
    backgroundColor: Colors.basic,
    borderRadius: 8,
    height: 5,
    marginHorizontal: 4,
    width: 8,
  },
  subTitleWrap: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: Spacing.tiny,
    marginTop: Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  subTitle: {
    flex: 1,
    marginLeft: Spacing.base,
  },
  subhead: {
    marginBottom: Spacing.double,
    marginTop: Spacing.large,
    paddingHorizontal: Spacing.double,
  },
  foodList: {
    paddingHorizontal: Spacing.base,
  },
  foodItem: {
    paddingHorizontal: Spacing.base,
  },
  content: {
    paddingBottom: Spacing.large,
  },
})
