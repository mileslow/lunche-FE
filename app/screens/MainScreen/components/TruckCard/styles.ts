import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, FontSize, Spacing, Metrics } from 'styles'

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.basic,
    borderRadius: 12,
    elevation: 4,
    marginBottom: Spacing.double,
    minHeight: Metrics.windowHeight / 3.3,
    shadowColor: Platform.select({ ios: Colors.shadowColor, android: undefined }),
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
    height: Metrics.truckListImgHeight,
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
