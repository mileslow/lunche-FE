import { StyleSheet } from 'react-native'
import { Spacing, Fonts, FontSize } from 'styles'

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
    fontFamily: Fonts.regular,
    fontSize: FontSize.regular,
  },
  icon: {
    height: 24,
    width: 24,
  },
})
