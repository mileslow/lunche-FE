import { StyleSheet } from 'react-native'
import { Colors, Spacing, Metrics } from 'styles'

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  mainBtn: {
    marginHorizontal: Spacing.double,
    marginVertical: Spacing.double,
  },
  mainTextWrap: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageBlock: {
    alignItems: 'center',
    height: Metrics.windowHeight / 2,
    justifyContent: 'flex-end',
  },
  bgIcon: {
    position: 'absolute',
  },
  actionBlock: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})
