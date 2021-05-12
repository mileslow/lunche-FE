import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  list: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    color: Colors.gunsmoke,
    marginLeft: Spacing.tiny,
    marginRight: Spacing.tiny,
  },
  firstItem: {
    marginLeft: 0,
  },
  point: {
    backgroundColor: Colors.gunsmoke,
    borderRadius: 2,
    height: 4,
    marginHorizontal: Spacing.tiny,
    width: 4,
  },
})
