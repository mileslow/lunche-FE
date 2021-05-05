import { StyleSheet } from 'react-native'
import { Colors, Fonts, FontSize, Spacing } from 'styles'

export default StyleSheet.create({
  headerIcon: {
    alignItems: 'center',
    backgroundColor: Colors.basic,
    borderRadius: 34 / 2,
    height: 34,
    justifyContent: 'center',
    marginHorizontal: 8,
    width: 34,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderRadius: 24 / 2,
    height: 24,
    justifyContent: 'center',
    marginHorizontal: 8,
    width: 24,
  },
  listTitle: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.bold,
    fontSize: FontSize.h3,
    paddingHorizontal: Spacing.double,
    paddingTop: Spacing.medium,
  },
  swipeBar: {
    alignSelf: 'center',
    backgroundColor: Colors.greyNurse,
    borderRadius: 2,
    height: 4,
    marginBottom: Spacing.base,
    marginTop: Spacing.medium,
    width: 34,
  },
  box: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  headerWithLocation: {
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.basic,
    borderBottomColor: Colors.concrete,
    borderBottomWidth: 1,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  leftNav: {
    flexDirection: 'row',
  },
  currentLocationWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  currentLocation: {
    color: Colors.midNightMoss,
    fontFamily: Fonts.regular,
    fontSize: FontSize.subhead,
    marginRight: Spacing.medium,
  },
  headerText: {
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: FontSize.base,
  },
  content: {
    padding: Spacing.double,
  },
})
