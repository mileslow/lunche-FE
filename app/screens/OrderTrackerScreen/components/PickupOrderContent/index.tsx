import React, { FC, memo, useCallback } from 'react'
// libs
import { Platform, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// components
import Button from 'components/Button'
import SwipeBar from 'components/SwipeBar'
import Divider from 'components/Divider'
import InfoSections from 'components/InfoSections'
import ScrollContent from 'components/AnimatedSheet/ScrollContent'
import AnimatedSheet from 'components/AnimatedSheet'
import Typography, { TypographyVariants } from 'components/Typography'
import TotalBottomBlock from 'components/TotalBottomBlock'
import OrderStatusCard from 'screens/OrderTrackerScreen/components/OrderStatusCard'
import OrderNumber from 'screens/OrderTrackerScreen/components/OrderNumber'
import OrderItemsList from 'screens/OrderTrackerScreen/components/OrderItemsList'
// types
import { Order } from 'store/orders/types'
// hooks
import { useOrderInfo } from 'screens/OrderTrackerScreen/hooks'
// assets
import BigMenuIcon from 'assets/svg/bigMenu.svg'
// services
import { openLink } from 'services/utils'
// styles
import { Metrics } from 'styles'
import styles from 'screens/OrderTrackerScreen/styles'

interface IProps {
  order: Order
}

const PickupOrderContent: FC<IProps> = ({ order }) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const { totals, steps, contactsInfo } = useOrderInfo(order)

  const handleGetDirection = useCallback(() => {
    const latLng = `${order.foodTruck.latitude},${order.foodTruck.longitude}`
    const label = 'Location of truck'
    const url = `${Platform.select({
      ios: `maps:0,0?q=${label}@${latLng}`,
      android: `geo:0,0?${latLng}?q=(${label})`,
    })}`
    openLink(url)
  }, [order])

  return (
    <>
      <OrderStatusCard
        style={styles.commonMargin}
        typeOrder={order?.type}
        steps={steps}
        cookingTime={order?.foodTruck.cookingTime}
      />

      <View style={styles.fullFlex}>
        <BigMenuIcon />
      </View>

      <Button
        title={t('orderTrackerScreen:getDirectionBtn')}
        onPress={handleGetDirection}
        style={styles.commonMargin}
      />

      <AnimatedSheet topPosition={insets.top + Metrics.header} endPosition={Metrics.windowHeight - 80}>
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
              <OrderNumber orderId={order.id} />

              <InfoSections
                info={contactsInfo}
                titleStyle={[styles.subhead, styles.commonPadding]}
                infoItemStyle={[styles.infoItem, styles.commonPadding]}
              />

              <Typography variant={TypographyVariants.subhead} style={[styles.subhead, styles.commonPadding]}>
                {t('orderTrackerScreen:order')}
              </Typography>

              <Divider style={styles.divider} />

              <OrderItemsList orderItems={order.orderItems} />
            </ScrollContent>

            <TotalBottomBlock
              style={styles.bottomBlock}
              totals={totals}
              textButton={t('orderTrackerScreen:getDirectionBtn')}
              onPress={handleGetDirection}
            />
          </>
        )}
      </AnimatedSheet>
    </>
  )
}

export default memo(PickupOrderContent)
