import React, { FC, memo } from 'react'
// libs
import { Image, View } from 'react-native'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
// types
import { OrderItems } from 'store/orders/types'
// services
import { getImageBySize } from 'services/utils'
// styles
import styles from 'screens/OrderTrackerScreen/styles'

interface IProps {
  orderItems: OrderItems
}

const OrderItemsList: FC<IProps> = ({ orderItems }) => (
  <>
    {map(orderItems, (item, index) => (
      <View style={[styles.menuItem, styles.commonPadding]} key={index}>
        <Image
          style={styles.orderItemImg}
          key={item.id}
          source={{ uri: getImageBySize(item.menuItem?.photo, 200, 200) }}
        />
        <Typography variant={TypographyVariants.body}>{item.menuItem?.name}</Typography>
      </View>
    ))}
  </>
)

export default memo(OrderItemsList)
