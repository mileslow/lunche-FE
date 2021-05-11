import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

const ROUND_ICON_SIZE = 34
export default StyleSheet.create({
  headerIcon: {
    backgroundColor: Colors.basic,
    borderRadius: ROUND_ICON_SIZE / 2,
    height: ROUND_ICON_SIZE,
    marginHorizontal: Spacing.base,
    width: ROUND_ICON_SIZE,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderRadius: 24 / 2,
    height: 24,
    justifyContent: 'center',
    marginHorizontal: Spacing.base,
    width: 24,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  leftNav: {
    flexDirection: 'row',
  },
})
