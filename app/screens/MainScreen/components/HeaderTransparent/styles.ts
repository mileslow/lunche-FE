import { StyleSheet } from 'react-native'
import { Colors } from 'styles'

export default StyleSheet.create({
  headerIcon: {
    backgroundColor: Colors.basic,
    marginHorizontal: 8,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderRadius: 24 / 2,
    height: 24,
    justifyContent: 'center',
    marginHorizontal: 8,
    width: 24,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  leftNav: {
    flexDirection: 'row',
  },
})
