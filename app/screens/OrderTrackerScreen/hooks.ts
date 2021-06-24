/* eslint-disable @typescript-eslint/no-var-requires */
import { useMemo } from 'react'
// libs
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash.upperfirst'
// types
import { TypographyVariants } from 'components/Typography'
import { DeliveryType, Order, OrderStatus } from 'store/orders/types'
import { OrderSteps } from 'screens/OrderTrackerScreen/components/OrderStatusCard'
// styles
import { Colors } from 'styles'

export const useOrderInfo = (order: Order | null) => {
  const { t } = useTranslation()

  const totals = useMemo<{ label: string; value: string; textVariant?: TypographyVariants }[]>(
    () => [
      { label: t('cartScreen:order'), value: `$ ${order?.orderSum ?? 0}` },
      { label: t('cartScreen:fee'), value: `$ ${order?.totalFee ?? 0}` },
      { label: t('cartScreen:total'), value: `$ ${order?.totalSum ?? 0}`, textVariant: TypographyVariants.body },
    ],
    [t, order],
  )

  const contactsInfo = useMemo(
    () =>
      order?.type === DeliveryType.PICKUP
        ? [
            {
              title: t('orderTrackerScreen:paymentMethod'),
              items: [
                { Icon: require('assets/svg/cash.svg').default, texts: [upperFirst(order?.paymentMethod ?? '')] },
              ],
            },
            {
              title: t(t('common:contacts')),
              items: [
                {
                  Icon: require('assets/svg/address.svg').default,
                  texts: [upperFirst(order?.foodTruck?.address ?? '')],
                  fill: Colors.midNightMoss,
                },
                {
                  Icon: require('assets/svg/phone.svg').default,
                  texts: [upperFirst(order?.foodTruck?.phone ?? '')],
                  fill: Colors.midNightMoss,
                },
              ],
            },
          ]
        : [],
    [order, t],
  )

  const steps = useMemo<OrderSteps | undefined>(() => {
    const commonSteps: OrderSteps = [
      {
        Icon: require('assets/svg/icon-done.svg').default,
        label: upperFirst(OrderStatus.APPROVING),
        status: order?.statusesStateMap.approving,
      },
      {
        Icon: require('assets/svg/cooking.svg').default,
        label: upperFirst(OrderStatus.COOKING),
        status: order?.statusesStateMap.cooking,
      },
    ]
    if (order?.type === DeliveryType.PICKUP) {
      return [
        ...commonSteps,
        {
          Icon: require('assets/svg/icon-chinese-food.svg').default,
          label: upperFirst(OrderStatus.READY),
          status: order?.statusesStateMap.ready,
        },
      ]
    }
    if (order?.type === DeliveryType.DELIVERY) {
      return [
        ...commonSteps,
        {
          Icon: require('assets/svg/icon-chinese-food.svg').default,
          label: upperFirst(OrderStatus.DELIVERING),
          status: order?.statusesStateMap.delivering,
        },
      ]
    }
  }, [order])

  return {
    totals,
    contactsInfo,
    steps,
  }
}
