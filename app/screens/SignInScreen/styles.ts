import { StyleSheet } from 'react-native'
import { Colors, FontSize, Spacing } from 'styles'

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  labelStyle: {
    color: Colors.gunsmoke,
    fontSize: FontSize.caption,
  },
  divider: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  inputPhoneNumber: {
    backgroundColor: Colors.basic,
    borderWidth: 0,
    color: Colors.gunsmoke,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    paddingHorizontal: Spacing.double,
  },
  title: {
    marginBottom: Spacing.doubleSmall,
  },
  subhead: {
    marginBottom: Spacing.large,
  },
  inputWrap: {
    marginBottom: Spacing.large,
  },
  inputContainerStyle: {
    flex: 1,
  },
})
