import { StyleSheet } from 'react-native'
import { Colors, Spacing, Metrics } from 'styles'

export default StyleSheet.create({
  meal: {
    flexDirection: 'row',
    padding: Spacing.base,
  },
  itemImg: {
    borderRadius: 8,
    height: Metrics.menuItemSize,
    margin: Spacing.base,
    width: Metrics.menuItemSize,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Spacing.base,
  },
  itemName: {
    marginBottom: Spacing.tiny,
    paddingRight: Spacing.large,
  },
  throughPrice: {
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    color: Colors.pigmentRed,
    marginLeft: Spacing.tiny,
  },
  priceInfo: {
    flexDirection: 'row',
  },
  discountIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  greenLine: {
    backgroundColor: Colors.primary,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 4,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
