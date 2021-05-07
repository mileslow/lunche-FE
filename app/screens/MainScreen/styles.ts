import { StyleSheet } from 'react-native'
import { Colors, Fonts, FontSize, Spacing } from 'styles'

export default StyleSheet.create({
  listTitle: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.bold,
    fontSize: FontSize.h3,
    marginBottom: Spacing.double,
    marginTop: 20,
    paddingHorizontal: Spacing.double,
    position: 'absolute',
  },
  swipeBar: {
    alignSelf: 'center',
    backgroundColor: Colors.greyNurse,
    borderRadius: 2,
    height: 4,
    marginTop: Spacing.medium,
    position: 'absolute',
    width: 34,
  },
  box: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.double,
    paddingTop: Spacing.base,
  },
})
