import React, { FC, memo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
// libs
import Svg, { Defs, Rect, Stop, LinearGradient, SvgProps } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Card from 'components/Card'
// types
import { DeliveryType, StatusesState } from 'store/orders/types'
// styles
import styles from './styles'
import { Colors } from 'styles'

export type OrderSteps = {
  Icon: FC<SvgProps>
  label: string
  status?: StatusesState
}[]

interface IProps {
  style: StyleProp<ViewStyle>
  steps?: OrderSteps
  typeOrder?: DeliveryType
  cookingTime?: number
  deliveryTime?: number
}

const OrderStatusCard: FC<IProps> = ({ style, steps, typeOrder, cookingTime = 0, deliveryTime = 0 }) => {
  const { t } = useTranslation()

  const textColors = {
    [StatusesState.DONE]: Colors.midNightMoss,
    [StatusesState.CURRENT]: Colors.primary,
    [StatusesState.WAITING]: Colors.gunsmoke,
  }

  const estimatedTimeText = {
    [DeliveryType.PICKUP]: t('orderTrackerScreen:estimatedTimeCooking'),
    [DeliveryType.DELIVERY]: t('orderTrackerScreen:estimatedTimeDelivery'),
  }

  const estimatedTime = {
    [DeliveryType.PICKUP]: cookingTime,
    [DeliveryType.DELIVERY]: cookingTime + deliveryTime,
  }

  return (
    <Card style={style}>
      <View style={styles.row}>
        <Typography variant={TypographyVariants.body}>{typeOrder && estimatedTimeText[typeOrder]}</Typography>
        <Typography variant={TypographyVariants.subhead}>{typeOrder ? estimatedTime[typeOrder] : 0} min</Typography>
      </View>
      <View style={styles.row}>
        {map(steps, ({ Icon, label, status }, index) => (
          <View key={index} style={styles.statusBlock}>
            <Icon width={40} height={40} />
            <Typography
              style={styles.statusText}
              color={textColors[status || StatusesState.WAITING]}
              weight={status === StatusesState.CURRENT ? 'bold' : undefined}
            >
              {label}
            </Typography>
            {status === StatusesState.CURRENT && (
              <Svg style={StyleSheet.absoluteFillObject} height='100%' width='100%' fill={'transparent'}>
                <Defs>
                  <LinearGradient id='grad' x1='0' y1='0' x2='1' y2='0'>
                    <Stop offset='0' stopColor='#fff' stopOpacity='0' />
                    <Stop offset='0.43' stopColor='#fff' stopOpacity='0.43' />
                    <Stop offset='1' stopColor='#fff' stopOpacity='0.6' />
                  </LinearGradient>
                </Defs>
                <Rect width='100%' height='100%' fill='url(#grad)' />
              </Svg>
            )}
          </View>
        ))}
      </View>
    </Card>
  )
}

export default memo(OrderStatusCard)
