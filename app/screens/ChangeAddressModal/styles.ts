import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  input: {
    marginHorizontal: Spacing.double,
  },
  subTitle: {
    marginTop: Spacing.doubleSmall,
    paddingHorizontal: Spacing.double,
  },
  commonText: {
    textAlign: 'center',
  },
  title: {
    marginBottom: Spacing.double,
  },
  description: {
    marginBottom: Spacing.doubleSmall,
  },
})
