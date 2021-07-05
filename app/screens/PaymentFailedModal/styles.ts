import { StyleSheet } from 'react-native'
import { Spacing } from 'styles'

export default StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  subtext: {
    marginTop: Spacing.base,
    paddingHorizontal: Spacing.large,
    textAlign: 'center',
  },
})
