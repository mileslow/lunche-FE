import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.basic,
    flex: 1,
  },
  deliveryTypes: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Spacing.large,
  },
  deliveryBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: Spacing.double,
    paddingHorizontal: Spacing.base,
  },
  buttonIcon: {
    marginRight: Spacing.tiny,
  },
  readOnlyField: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.large,
  },
  contentScroll: {
    paddingHorizontal: Spacing.double,
  },
  label: {
    marginBottom: Spacing.base,
  },
  readonlyFieldPart: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  addressIcon: {
    marginRight: Spacing.base,
  },
  buttonWrap: {
    paddingHorizontal: Spacing.double,
    paddingVertical: Spacing.double,
  },
  scroll: {
    flex: 1,
  },
  button: {
    marginHorizontal: Spacing.double,
    marginVertical: Spacing.double,
  },
})
