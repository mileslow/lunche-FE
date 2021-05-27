import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { PreSaveOrderItem } from 'store/orders/types'
import { addItemToOrder, removeItemFromOrder } from 'store/orders/model'
import { AppDispatch } from 'store'

const useCountOrderPress = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (item: PreSaveOrderItem) => (c: number) => {
      const count = item.itemCount + c
      if (count < 1) {
        dispatch(removeItemFromOrder(item.menuItemId))
      } else {
        dispatch(addItemToOrder({ ...item, itemCount: count }))
      }
    },
    [dispatch],
  )
}

export default useCountOrderPress
