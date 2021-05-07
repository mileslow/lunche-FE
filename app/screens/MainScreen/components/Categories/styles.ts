import { StyleSheet } from 'react-native'
import { Spacing, Fonts, FontSize, Colors } from 'styles'

export default StyleSheet.create({
  scroll: {
    width: '100%',
  },
  scrollContent: {
    marginVertical: Spacing.double,
    paddingLeft: Spacing.double,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.medium,
  },
  itemLabel: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.regular,
  },
})
