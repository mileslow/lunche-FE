import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  content: {
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: Spacing.double,
  },
  methodItem: {
    marginRight: Spacing.base,
  },
  addCard: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Spacing.large,
  },
})
