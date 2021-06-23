import { Platform, StyleSheet } from 'react-native'
import { Colors } from 'styles'

const BORDER_RADIUS = 20

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.basic,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    elevation: 4,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    shadowColor: Platform.select({ ios: Colors.shadowColor, android: undefined }),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  fullFlex: {
    flex: 1,
  },
})
