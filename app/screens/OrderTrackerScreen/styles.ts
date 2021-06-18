import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export const MENU_ITEM_SIZE = 42

export default StyleSheet.create({
  swipeBar: {
    alignSelf: 'center',
    backgroundColor: Colors.gunsmoke,
    borderRadius: 2,
    height: 4,
    marginBottom: Spacing.base,
    marginTop: Spacing.medium,
    width: 34,
  },
  foodIcon: {
    alignItems: 'center',
    backgroundColor: Colors.cadmiumOrange,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginRight: Spacing.double,
    width: 32,
  },
  orderNumberRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Spacing.double,
    paddingHorizontal: Spacing.double,
  },
  fullFlex: {
    flex: 1,
  },
  subhead: {
    marginBottom: Spacing.double,
    marginTop: Spacing.base,
    paddingHorizontal: Spacing.double,
  },
  infoItem: {
    marginBottom: Spacing.double,
    paddingHorizontal: Spacing.double,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: Spacing.double,
    paddingHorizontal: Spacing.double,
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
  totalRow: {
    paddingHorizontal: Spacing.double,
  },
  action: {
    marginHorizontal: Spacing.double,
  },
  statusCard: {
    marginHorizontal: Spacing.double,
  },
})
