import React, { FC, memo, useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { StackScreenProps } from '@react-navigation/stack'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Divider from 'components/Divider'
import Button from 'components/Button'
import ScreenContainer from 'components/ScreenContainer'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// assets
import TruckIcon from 'assets/svg/delivery-truck.svg'
import DashedLineIcon from 'assets/svg/dashed-line.svg'
import ChinaFoodIcon from 'assets/svg/chinese-food.svg'
// styles
import { Metrics } from 'styles'
import styles from './styles'

const SuccessOrderModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.SuccessOrderModal>> = ({
  navigation,
}) => {
  const { t } = useTranslation()

  const handlePress = useCallback(() => {
    navigation.navigate(Routes.OrdersTab)
  }, [navigation])

  return (
    <ScreenContainer>
      <View style={styles.imageBlock}>
        <DashedLineIcon width={Metrics.windowWidth} style={styles.bgIcon} />
        <TruckIcon />
      </View>
      <View style={styles.mainTextWrap}>
        <Typography variant={TypographyVariants.h3}>{t('successOrderScreen:mainText')}</Typography>
        <ChinaFoodIcon />
      </View>
      <View style={styles.actionBlock}>
        <Divider />
        <Button style={styles.mainBtn} title={t('successOrderScreen:mainButton')} onPress={handlePress} />
      </View>
    </ScreenContainer>
  )
}

export default memo(SuccessOrderModal)
