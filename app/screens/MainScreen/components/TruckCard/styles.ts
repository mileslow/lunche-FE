import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, FontSize, Spacing } from 'styles'

const WINDOW_HEIGHT = Dimensions.get('window').height

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.basic,
    borderRadius: 12,
    elevation: 4,
    marginBottom: Spacing.double,
    minHeight: WINDOW_HEIGHT / 3.3,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  mainImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 144,
    marginBottom: Spacing.base,
    width: '100%',
  },
  subhead: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.subhead,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.double,
  },
  categories: {
    marginBottom: Spacing.small,
    paddingHorizontal: Spacing.double,
  },
  info: {
    marginBottom: Spacing.small,
  },
})
