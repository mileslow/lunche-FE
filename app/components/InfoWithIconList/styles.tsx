import { StyleSheet } from 'react-native'
import { Spacing } from 'styles'

export default StyleSheet.create({
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
  },
  infoItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: Spacing.base,
  },
  infoText: {
    marginLeft: Spacing.tiny,
  },
})
