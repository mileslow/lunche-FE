import React, { FC, memo } from 'react'
// libs
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
// components
import Typography, { TypographyVariants } from 'components/Typography'
// assets
import FoodIcon from 'assets/svg/food.svg'
// styles
import { Colors, Spacing } from 'styles'

const styles = StyleSheet.create({
  orderNumberRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Spacing.double,
    paddingHorizontal: Spacing.double,
  },
  foodIcon: {
    alignItems: 'center',
    backgroundColor: Colors.cadmiumOrange,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginRight: Spacing.double,
    width: 32,
  },
})

const OrderNumber: FC<{ orderId?: number; withIcon?: boolean }> = ({ orderId, withIcon = true }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.orderNumberRow}>
      {withIcon && (
        <View style={styles.foodIcon}>
          <FoodIcon />
        </View>
      )}
      <Typography>
        {t('orderTrackerScreen:orderNumber')}
        {': '}
        <Typography variant={TypographyVariants.subhead}>{`#${orderId ?? ''}`}</Typography>
      </Typography>
    </View>
  )
}

export default memo(OrderNumber)
