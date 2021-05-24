import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export const IMAGE_SIZE = 300

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: Spacing.double,
  },
  textWrap: {
    flex: 1,
  },
  carouselDot: {
    borderRadius: 8,
    height: 5,
    width: 8,
  },
  button: {
    marginHorizontal: Spacing.double,
  },
  image: {
    marginBottom: Spacing.double,
  },
  title: {
    marginBottom: Spacing.small,
    marginTop: Spacing.large,
    textAlign: 'center',
  },
  desc: {
    marginTop: Spacing.small,
    textAlign: 'center',
  },
  imageWrap: {
    flex: 3,
    justifyContent: 'center',
  },
})
