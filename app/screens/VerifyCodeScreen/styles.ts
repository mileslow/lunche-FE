import { Platform, StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

const CELL_SIZE = 50

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.double,
  },
  commonTextStyle: {
    textAlign: 'center',
  },
  title: {
    marginBottom: Spacing.doubleSmall,
  },
  button: {
    marginBottom: Spacing.large,
  },
  resendBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.large,
  },
  notReceiveText: {
    marginRight: Spacing.base,
  },
  cell: {
    alignItems: 'center',
    backgroundColor: Colors.basic,
    borderBottomColor: Colors.midNightMoss,
    borderBottomWidth: 1,
    elevation: 24,
    height: CELL_SIZE,
    justifyContent: 'center',
    marginHorizontal: Spacing.small,
    shadowColor: Platform.select({ ios: 'rgba(0, 0, 0, 0.03)', android: undefined }),
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 24,
    width: CELL_SIZE,
  },
  codeFieldRoot: {
    justifyContent: 'center',
    marginVertical: Spacing.double,
  },
  cursor: {
    backgroundColor: Colors.primary,
    height: 24,
    width: 1,
  },
})
