import { StyleSheet } from 'react-native'
import { Spacing } from 'styles'

export const MENU_ITEM_SIZE = 42

export const MIN_POSITION = 80

export default StyleSheet.create({
  header: {
    zIndex: 1,
  },
  swipeBar: {
    alignSelf: 'center',
    marginBottom: Spacing.base,
    marginTop: Spacing.medium,
  },
  fullFlex: {
    flex: 1,
  },
  subhead: {
    marginBottom: Spacing.double,
    marginTop: Spacing.base,
  },
  infoItem: {
    marginBottom: Spacing.double,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: Spacing.double,
  },
  orderItemImg: {
    borderRadius: MENU_ITEM_SIZE / 2,
    height: MENU_ITEM_SIZE,
    marginRight: Spacing.base,
    width: MENU_ITEM_SIZE,
  },
  divider: {
    marginBottom: Spacing.double,
  },
  commonPadding: {
    paddingHorizontal: Spacing.double,
  },
  commonMargin: {
    marginHorizontal: Spacing.double,
  },
  courierBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.large,
  },
  callButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  bottomBlock: {
    borderTopWidth: 0,
  },
})
