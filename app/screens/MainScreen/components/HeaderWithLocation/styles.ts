import { StyleSheet } from 'react-native'
import { Colors, Fonts, FontSize, Spacing } from 'styles'

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: Colors.basic,
    borderBottomColor: Colors.concrete,
    borderBottomWidth: 1,
  },
  currentLocationWrap: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Spacing.double,
  },
  currentLocation: {
    color: Colors.midNightMoss,
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FontSize.subhead,
    marginRight: Spacing.medium,
  },
  headerText: {
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: FontSize.base,
  },
})
