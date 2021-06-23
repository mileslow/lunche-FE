import { StyleSheet } from 'react-native'
import { Spacing, Metrics } from 'styles'

export default StyleSheet.create({
  card: {
    minHeight: Metrics.windowHeight / 3.3,
  },
  mainImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: Metrics.truckListImgHeight,
    marginBottom: Spacing.base,
    width: '100%',
  },
  subhead: {
    flex: 1,
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
  nameBlock: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeBtn: {
    paddingHorizontal: Spacing.double,
    paddingVertical: Spacing.tiny,
  },
})
