import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, FontSize, Spacing } from 'styles'

const WINDOW_HEIGHT = Dimensions.get('window').height

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.basic,
    borderRadius: 12,
    elevation: 4,
    height: WINDOW_HEIGHT / 3.3,
    marginBottom: Spacing.double,
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
    marginBottom: Spacing.base,
    width: '100%',
  },
  subhead: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.subhead,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  categories: {
    marginBottom: Spacing.small,
  },
  info: {
    marginBottom: Spacing.small,
  },
})
