import React, { FC, memo, useCallback, useEffect, useReducer } from 'react'
// libs
import { View, Linking, Platform, StyleProp, ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// components
import ScreenContainer from 'components/ScreenContainer'
import Header from 'components/Header'
import Typography, { TypographyVariants } from 'components/Typography'
import Button from 'components/Button'
import Totals from 'components/Totals'
import InfoSections from 'components/InfoSections'
import AnimatedSheet from 'components/AnimatedSheet'
import ScrollContent from 'components/AnimatedSheet/ScrollContent'
import Divider from 'components/Divider'
import OrderStatusCard from 'screens/OrderTrackerScreen/components/OrderStatusCard'
// thunks
import { getOrder } from 'store/orders/thunks'
// types
import { AppDispatch } from 'store'
import { StackScreenProps } from '@react-navigation/stack'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { Order } from 'store/orders/types'
// hooks
import { useOrderInfo } from './hooks'
// assets
import BigMenuIcon from 'assets/svg/bigMenu.svg'
import FoodIcon from 'assets/svg/food.svg'
// styles
import { Metrics, Spacing } from 'styles'
import styles from './styles'

type State = {
  order: Order | null
  isLoading: boolean
}

const initialState = {
  order: null,
  isLoading: false,
}

const OrderTrackerScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.OrderTrackerScreen>> = ({
  route,
}) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const dispatch = useDispatch<AppDispatch>()

  const [{ order, isLoading }, setState] = useReducer(
    (store: State, newStore: Partial<State>) => ({ ...store, ...newStore }),
    initialState,
  )

  const { totals, contactsInfo, orderItems, steps } = useOrderInfo(order)

  useEffect(() => {
    const fetchOrder = async () => {
      setState({ isLoading: true })
      const result = await dispatch(getOrder(route.params.orderId))
      if (getOrder.fulfilled.match(result)) {
        setState({ isLoading: false, order: result.payload })
        return
      }
      setState({ isLoading: false })
    }
    fetchOrder()
  }, [route.params.orderId, dispatch])

  const handleGetDirection = useCallback(async () => {
    const latLng = `${order?.foodTruck?.latitude},${order?.foodTruck?.longitude}`
    const label = 'Location of truck'
    const url = `${Platform.select({
      ios: `maps:0,0?q=${label}@${latLng}`,
      android: `geo:0,0?${latLng}?q=(${label})`,
    })}`
    const isCanOpen = await Linking.canOpenURL(url)
    if (isCanOpen) {
      Linking.openURL(url)
    }
  }, [order])

  const primaryButton = useCallback(
    (style?: StyleProp<ViewStyle>) => (
      <Button
        title={t('orderTrackerScreen:getDirectionBtn')}
        onPress={handleGetDirection}
        style={[styles.action, style]}
      />
    ),
    [handleGetDirection, t],
  )

  return (
    <ScreenContainer style={{ paddingBottom: 80 + Spacing.large }} isLoading={isLoading}>
      <Header withBack title={t('orderTrackerScreen:headerTitle')} />
      <OrderStatusCard style={styles.statusCard} steps={steps} />
      <View style={styles.fullFlex}>
        <BigMenuIcon />
      </View>
      {primaryButton()}
      <AnimatedSheet topPosition={insets.top + Metrics.header} endPosition={Metrics.windowHeight - 80}>
        {({ onRegisterScroll, scrollViewRef, waitFor, simultaneousHandlers }) => (
          <>
            <View style={styles.swipeBar} />
            <ScrollContent
              waitFor={waitFor}
              scrollViewRef={scrollViewRef}
              onRegisterScroll={onRegisterScroll}
              simultaneousHandlers={simultaneousHandlers}
              style={styles.fullFlex}
            >
              <View style={styles.orderNumberRow}>
                <View style={styles.foodIcon}>
                  <FoodIcon />
                </View>
                <Typography>
                  {t('orderTrackerScreen:orderNumber')}
                  {': '}
                  <Typography variant={TypographyVariants.subhead}>{`#${order?.id ?? ''}`}</Typography>
                </Typography>
              </View>
              <InfoSections info={contactsInfo} titleStyle={styles.subhead} infoItemStyle={styles.infoItem} />
              <Typography variant={TypographyVariants.subhead} style={styles.subhead}>
                {t('orderTrackerScreen:order')}
              </Typography>
              <Divider style={styles.divider} />
              {orderItems}
            </ScrollContent>
            <Totals totals={totals} style={styles.totalRow} />
            {primaryButton({ marginBottom: insets.bottom + Spacing.large })}
          </>
        )}
      </AnimatedSheet>
    </ScreenContainer>
  )
}

export default memo(OrderTrackerScreen)
