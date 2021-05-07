import { StyleSheet } from 'react-native'
import { Colors, Fonts, FontSize, Spacing } from 'styles'

export default StyleSheet.create({
  subNavigation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Spacing.double,
    paddingHorizontal: Spacing.base,
  },
  subNavigationBlock: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  subNavigationAction: {
    marginHorizontal: Spacing.base,
  },
  onlyLabel: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.regular,
    marginLeft: Spacing.medium,
    marginRight: Spacing.base,
  },
})
