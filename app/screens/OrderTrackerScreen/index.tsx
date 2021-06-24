import React, { FC, memo, useEffect, useReducer } from 'react'
// libs
import { useDispatch } from 'react-redux'
// components
import ScreenContainer from 'components/ScreenContainer'
import Header from 'components/Header'
import DeliveryOrderContent from 'screens/OrderTrackerScreen/components/DeliveryOrderContent'
import PickupOrderContent from 'screens/OrderTrackerScreen/components/PickupOrderContent'
// thunks
import { getOrder, getOrderDelivery } from 'store/orders/thunks'
// types
import { AppDispatch } from 'store'
import { StackScreenProps } from '@react-navigation/stack'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { Courier, DeliveryType, Order } from 'store/orders/types'
// styles
import { Colors, Spacing } from 'styles'
import styles, { MIN_POSITION } from './styles'
import { useTranslation } from 'react-i18next'

type State = {
  order: Order | null
  isLoading: boolean
  quotaCreated: string | null
  dropoffEta: string | null
  courier: Courier | null
}

const initialState = {
  order: null,
  courier: null,
  quotaCreated: null,
  dropoffEta: null,
  isLoading: false,
}

const OrderTrackerScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.OrderTrackerScreen>> = ({
  route,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const [{ order, isLoading, courier, dropoffEta, quotaCreated }, setState] = useReducer(
    (store: State, newStore: Partial<State>) => ({ ...store, ...newStore }),
    initialState,
  )

  useEffect(() => {
    const fetchOrder = async () => {
      setState({ isLoading: true })
      const result = await dispatch(getOrder(route.params.orderId))
      if (getOrder.fulfilled.match(result)) {
        if (result.payload.type === DeliveryType.DELIVERY) {
          const deliveryResult = await dispatch(getOrderDelivery(route.params.orderId))
          if (getOrderDelivery.fulfilled.match(deliveryResult)) {
            setState({
              isLoading: false,
              order: result.payload,
              courier: deliveryResult.payload.courier,
              quotaCreated: deliveryResult.payload.created,
              dropoffEta: deliveryResult.payload.dropoff_eta,
            })
            return
          }
        }
        setState({ isLoading: false, order: result.payload })
        return
      }
      setState({ isLoading: false })
    }
    fetchOrder()
  }, [route.params.orderId, dispatch])

  return (
    <ScreenContainer style={{ paddingBottom: MIN_POSITION + Spacing.large }} isLoading={isLoading}>
      <Header withBack title={t('orderTrackerScreen:headerTitle')} bgColor={Colors.transparent} style={styles.header} />

      {order?.type === DeliveryType.DELIVERY && (
        <DeliveryOrderContent order={order} courier={courier} quotaCreated={quotaCreated} dropoffEta={dropoffEta} />
      )}
      {order?.type === DeliveryType.PICKUP && <PickupOrderContent order={order} />}
    </ScreenContainer>
  )
}

export default memo(OrderTrackerScreen)
