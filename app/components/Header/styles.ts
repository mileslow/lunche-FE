import { StyleSheet } from 'react-native'
import { Colors, Metrics, Spacing } from 'styles'

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: Colors.basic,
    flexDirection: 'row',
    height: Metrics.header,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
  },
  headerTitle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessory: {
    flexDirection: 'row',
    zIndex: 1,
  },
  backIcon: {
    marginHorizontal: Spacing.base,
  },
})
