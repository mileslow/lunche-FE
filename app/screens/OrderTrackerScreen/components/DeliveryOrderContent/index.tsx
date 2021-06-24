import React, { FC, useCallback, useMemo, memo } from 'react'
// libs
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import dayjs from 'dayjs'
// components
import Map, { PointAnnotation } from 'components/Map'
import User from 'components/User'
import SwipeBar from 'components/SwipeBar'
import Typography, { TypographyVariants } from 'components/Typography'
import AnimatedSheet from 'components/AnimatedSheet'
import Button, { ButtonTypes } from 'components/Button'
import Divider from 'components/Divider'
import Totals from 'components/Totals'
import ScrollContent from 'components/AnimatedSheet/ScrollContent'
import OrderStatusCard from 'screens/OrderTrackerScreen/components/OrderStatusCard'
import OrderNumber from 'screens/OrderTrackerScreen/components/OrderNumber'
import OrderItemsList from 'screens/OrderTrackerScreen/components/OrderItemsList'
// store
import { Courier, DeliveryType, Order, OrderStatus } from 'store/orders/types'
// services
import { openLink } from 'services/utils'
// assets
import AddressIcon from 'assets/svg/address.svg'
import PhoneIcon from 'assets/svg/phone.svg'
// styles
import styles, { MIN_POSITION } from 'screens/OrderTrackerScreen/styles'
import { Colors, Metrics, Spacing } from 'styles'

import { useOrderInfo } from 'screens/OrderTrackerScreen/hooks'

interface IProps {
  order: Order
  courier: Courier | null
  dropoffEta: string | null
  quotaCreated: string | null
}

const DeliveryOrderContent: FC<IProps> = ({ order, courier, dropoffEta, quotaCreated }) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const { totals, steps } = useOrderInfo(order)

  const locationOnMap = useMemo(() => {
    if (courier && order?.status === OrderStatus.DELIVERING) {
      return courier.location
    }
    return order?.foodTruck ? { lat: order.foodTruck.latitude, lng: order.foodTruck.longitude } : undefined
  }, [order, courier])

  const handleCall = useCallback(() => openLink(`tel:${courier?.phone_number}`), [courier])

  const deliveryTime =
    quotaCreated && dropoffEta && order?.type === DeliveryType.DELIVERY
      ? dayjs(dropoffEta).diff(quotaCreated, 'minute')
      : 0

  return (
    <>
      <Map style={StyleSheet.absoluteFillObject} location={locationOnMap} zoomLevel={16}>
        {locationOnMap ? (
          <PointAnnotation id={`${order.id}`} coordinate={[locationOnMap.lng, locationOnMap.lat]}>
            <AddressIcon fill={Colors.primary} width={34} height={40} />
          </PointAnnotation>
        ) : undefined}
      </Map>

      <OrderStatusCard
        style={styles.commonMargin}
        typeOrder={order?.type}
        steps={steps}
        cookingTime={order?.foodTruck.cookingTime}
        deliveryTime={deliveryTime}
      />

      <AnimatedSheet topPosition={insets.top + Metrics.header} endPosition={Metrics.windowHeight - MIN_POSITION}>
        {({ onRegisterScroll, scrollViewRef, waitFor, simultaneousHandlers }) => (
          <>
            <SwipeBar style={styles.swipeBar} />

            <ScrollContent
              waitFor={waitFor}
              scrollViewRef={scrollViewRef}
              onRegisterScroll={onRegisterScroll}
              simultaneousHandlers={simultaneousHandlers}
              style={styles.fullFlex}
            >
              <View style={[styles.courierBlock, styles.commonPadding]}>
                <User avatar={courier?.img_href} name={courier?.name} phone={courier?.phone_number} />
                <Button type={ButtonTypes.link} style={styles.callButton} onPress={handleCall}>
                  <PhoneIcon fill={Colors.primary} />
                </Button>
              </View>

              <OrderNumber orderId={order.id} withIcon={false} />

              <Typography variant={TypographyVariants.subhead} style={[styles.subhead, styles.commonPadding]}>
                {t('orderTrackerScreen:order')}
              </Typography>

              <Divider style={styles.divider} />

              <OrderItemsList orderItems={order.orderItems} />
            </ScrollContent>

            <View style={{ paddingBottom: insets.bottom + Spacing.large }}>
              <Totals totals={totals} style={styles.commonMargin} />
            </View>
          </>
        )}
      </AnimatedSheet>
    </>
  )
}

export default memo(DeliveryOrderContent)
