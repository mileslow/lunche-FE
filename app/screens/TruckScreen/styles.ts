import { StyleSheet } from 'react-native'
import round from 'lodash.round'
import { Colors, Spacing, Metrics } from 'styles'

export const TRUCK_IMAGE_HEIGHT = round(Metrics.windowHeight / 3)

export default StyleSheet.create({
  screen: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  truckInfo: {
    height: TRUCK_IMAGE_HEIGHT,
    justifyContent: 'flex-end',
    width: '100%',
  },
  truckTitle: {
    flexDirection: 'row',
    marginBottom: Spacing.base,
  },
  titleWrap: {
    flex: 1,
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
    paddingHorizontal: Spacing.double,
  },
  categories: {
    marginBottom: Spacing.small,
    paddingHorizontal: Spacing.double,
  },
  info: {
    marginBottom: 18,
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  headerIcon: {
    position: 'absolute',
  },
})
