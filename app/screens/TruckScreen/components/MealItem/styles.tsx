import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  meal: {
    flexDirection: 'row',
    padding: Spacing.base,
  },
  mealImg: {
    borderRadius: 8,
    height: 112,
    margin: Spacing.base,
    width: 112,
  },
  mealInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Spacing.base,
  },
  mealName: {
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
})
