import { StyleSheet } from 'react-native'
import { Colors, Spacing, Metrics } from 'styles'

const INPUT_ICON_SIZE = 32

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
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
    left: Metrics.windowWidth * 0.1,
    right: Metrics.windowWidth * 0.1,
  },
  headerIcon: {
    marginHorizontal: Spacing.base,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.base,
    paddingHorizontal: Spacing.double,
  },
  divider: {
    marginVertical: Spacing.base,
  },
  totals: {
    backgroundColor: Colors.concrete,
    paddingHorizontal: Spacing.double,
    paddingVertical: Spacing.base,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.tiny,
  },
  button: {
    marginBottom: Spacing.base,
    marginTop: Spacing.doubleSmall,
  },
  scrollStyle: {
    flex: 1,
  },
  input: {
    marginHorizontal: Spacing.double,
  },
  inputIcon: {
    alignItems: 'center',
    backgroundColor: Colors.basic,
    borderRadius: INPUT_ICON_SIZE,
    height: INPUT_ICON_SIZE,
    justifyContent: 'center',
    width: INPUT_ICON_SIZE,
  },
})
