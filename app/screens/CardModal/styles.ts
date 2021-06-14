import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.transparent,
    flex: 1,
  },
  modal: {
    backgroundColor: Colors.basic,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.double,
    paddingTop: Spacing.double,
  },
  cardStyle: {
    backgroundColor: Colors.alabaster,
    color: Colors.midNightMoss,
  },
  cardFieldStyle: {
    borderColor: Colors.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    marginBottom: Spacing.double,
    marginTop: Spacing.base,
  },
})
