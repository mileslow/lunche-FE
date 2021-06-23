import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography, { TypographyVariants } from 'components/Typography'
import { Order, OrderStatus } from 'store/orders/types'
import CashIcon from 'assets/svg/cash.svg'
import upperFirst from 'lodash.upperfirst'
import AddressIcon from 'assets/svg/address.svg'
import { Colors } from 'styles'
import PhoneIcon from 'assets/svg/phone.svg'
import map from 'lodash.map'
import { Image, View } from 'react-native'
import styles from 'screens/OrderTrackerScreen/styles'
import { getImageBySize } from 'services/utils'
import { OrderSteps } from 'screens/OrderTrackerScreen/components/OrderStatusCard'
import DoneIcon from 'assets/svg/icon-done.svg'
import CookingIcon from 'assets/svg/cooking.svg'
import ChinesFood from 'assets/svg/icon-chinese-food.svg'

export const useOrderInfo = (order: Order | null) => {
  const { t } = useTranslation()

  const totals = useMemo<{ label: string; value: string; textVariant?: TypographyVariants }[]>(
    () => [
      { label: t('cartScreen:order'), value: `$ ${order?.totalSum ?? 0}` },
      { label: t('cartScreen:fee'), value: `$ ${order?.totalFee ?? 0}` },
    ],
    [t, order],
  )

  const contactsInfo = useMemo(
    () => [
      {
        title: t('orderTrackerScreen:paymentMethod'),
        items: [{ icon: CashIcon, texts: [upperFirst(order?.paymentMethod ?? '')] }],
      },
      {
        title: t(t('common:contacts')),
        items: [
          { icon: AddressIcon, texts: [upperFirst(order?.foodTruck?.address ?? '')], fill: Colors.midNightMoss },
          { icon: PhoneIcon, texts: [upperFirst(order?.foodTruck?.phone ?? '')], fill: Colors.midNightMoss },
        ],
      },
    ],
    [order, t],
  )

  const orderItems = useMemo(
    () =>
      map(order?.orderItems, (item, index) => (
        <View style={styles.menuItem} key={index}>
          <Image
            style={styles.orderItemImg}
            key={item.id}
            source={{ uri: getImageBySize(item.menuItem?.photo, 200, 200) }}
          />
          <Typography variant={TypographyVariants.body}>{item.menuItem?.name}</Typography>
        </View>
      )),
    [order],
  )

  const steps: OrderSteps | undefined = order
    ? [
        { Icon: DoneIcon, label: upperFirst(OrderStatus.APPROVING), status: order?.statusesStateMap.approving },
        { Icon: CookingIcon, label: upperFirst(OrderStatus.COOKING), status: order?.statusesStateMap.cooking },
        { Icon: ChinesFood, label: upperFirst(OrderStatus.READY), status: order?.statusesStateMap.ready },
      ]
    : undefined

  return {
    totals,
    contactsInfo,
    orderItems,
    steps,
  }
}
