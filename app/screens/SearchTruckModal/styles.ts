import { StyleSheet } from 'react-native'
import { Colors, Metrics, Spacing } from 'styles'

export const CATEGORY_WIDTH = (Metrics.windowWidth - Spacing.base - Spacing.double * 2) / 2

export const CATEGORY_HEIGHT = CATEGORY_WIDTH / 1.16

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  input: {
    marginHorizontal: Spacing.double,
  },
  searchItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.double,
    paddingVertical: Spacing.base,
  },
  searchIcon: {
    marginRight: Spacing.base,
  },
  subTitle: {
    paddingHorizontal: Spacing.double,
  },
  notFoundText: {
    marginBottom: Spacing.tiny,
    marginTop: -50,
  },
  placeholderView: {
    alignItems: 'center',
  },
  burgerStyle: {
    width: Metrics.windowWidth,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    borderRadius: 12,
    opacity: 0.6,
  },
  category: {
    borderRadius: 12,
    height: CATEGORY_HEIGHT,
    marginBottom: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
    width: CATEGORY_WIDTH,
  },
  categoryImage: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  searchContent: {
    paddingHorizontal: Spacing.double,
  },
})
