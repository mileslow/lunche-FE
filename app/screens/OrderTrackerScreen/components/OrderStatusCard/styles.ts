import { StyleSheet } from 'react-native'
import { Spacing } from 'styles'

export default StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.doubleSmall,
    marginTop: Spacing.double,
    paddingHorizontal: Spacing.double,
  },
  statusBlock: {
    alignItems: 'center',
  },
  statusText: {
    marginTop: Spacing.base,
  },
})
