import { Dimensions, StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export const TRUCK_IMAGE_HEIGHT = Dimensions.get('window').height / 3

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  truckInfo: {
    height: TRUCK_IMAGE_HEIGHT,
    justifyContent: 'flex-end',
    width: '100%',
  },
  truckTitle: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    paddingHorizontal: Spacing.base,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  rightNav: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  truckImage: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  subNavigation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.double,
    paddingVertical: Spacing.base,
  },
  animSubNavigation: {
    backgroundColor: Colors.basic,
    position: 'relative',
    zIndex: 1,
  },
  subhead: {
    paddingHorizontal: Spacing.base,
  },
  categories: {
    marginBottom: Spacing.small,
  },
  info: {
    marginBottom: 18,
  },
  underLine: {
    textDecorationLine: 'underline',
  },
})
