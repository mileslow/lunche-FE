import { StyleSheet } from 'react-native'
import { Colors, Metrics, Spacing } from 'styles'

const BORDER_RADIUS = 20

export const CLOSE_ICON_SIZE = 28

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.transparent,
    flex: 1,
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.basic,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    flex: 1,
    overflow: 'hidden',
    paddingBottom: 48 + Spacing.double * 2,
  },
  mainImage: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    height: Metrics.truckImgHeight,
    width: '100%',
  },
  button: {
    marginHorizontal: Spacing.double,
    marginVertical: Spacing.double,
  },
  info: {
    flex: 1,
    paddingHorizontal: Spacing.double,
  },
  title: {
    marginBottom: Spacing.tiny,
    marginTop: Spacing.base,
  },
  desc: {
    marginBottom: Spacing.medium,
  },
  closeBtn: {
    position: 'absolute',
    right: Spacing.double,
    top: Spacing.small,
    zIndex: 1,
  },
  buttonWrap: {
    backgroundColor: Colors.basic,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
})
