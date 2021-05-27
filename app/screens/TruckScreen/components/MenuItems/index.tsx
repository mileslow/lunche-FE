import React, { FC, Fragment, memo, useCallback, useMemo } from 'react'
// libs
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash.map'
import filter from 'lodash.filter'
import intersection from 'lodash.intersection'
// components
import Divider from 'components/Divider'
import MealItem from 'screens/TruckScreen/components/MealItem'
// store
import { menuItemsSelector } from 'store/trucks/selectors'
import { OrderItem, OrderItems } from 'store/orders/types'
import { addItemToOrder, removeItemFromOrder } from 'store/orders/model'
// types
import { AppDispatch } from 'store'
import { Routes, RootNavigationStackParamsList } from 'navigation'

interface IProps {
  selectedTypes: number[]
  truckId: number
  orderItems: OrderItems
}
const MenuItems: FC<IProps> = ({ selectedTypes, truckId, orderItems }) => {
  const dispatch = useDispatch<AppDispatch>()

  const navigation = useNavigation<StackNavigationProp<RootNavigationStackParamsList>>()

  const menuItems = useSelector(menuItemsSelector)

  const menu = useMemo(
    () =>
      selectedTypes.length
        ? filter(menuItems, (item) => !!intersection(selectedTypes, map(item.foodTypes, 'id')).length)
        : menuItems,
    [menuItems, selectedTypes],
  )

  const handleCountPress = useCallback(
    (item: OrderItem) => (c: number) => {
      const count = item.itemCount + c
      if (count < 1) {
        dispatch(removeItemFromOrder(item.menuItemId))
      } else {
        dispatch(addItemToOrder({ ...item, itemCount: count }))
      }
    },
    [dispatch],
  )

  const handleMenuItemPress = useCallback(
    (id: number) => () => {
      navigation.navigate(Routes.DishModal, { id, truckId })
    },
    [navigation, truckId],
  )

  return (
    <>
      {map(menu, (item) => (
        <Fragment key={item.id}>
          <Divider />
          <MealItem
            item={item}
            orderItem={orderItems[item.id]}
            onPress={handleMenuItemPress(item.id)}
            onCountPress={handleCountPress(orderItems[item.id])}
          />
        </Fragment>
      ))}
    </>
  )
}

export default memo(MenuItems)
