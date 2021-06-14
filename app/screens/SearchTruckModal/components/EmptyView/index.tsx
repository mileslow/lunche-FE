import React, { memo } from 'react'
// libs
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import LottieView from 'lottie-react-native'
// components
import Typography, { TypographyVariants } from 'components/Typography'
// assets
import burgerAnimation from 'assets/lottie/burger.json'
// styles
import styles from 'screens/SearchTruckModal/styles'
import { Colors } from 'styles'

const EmptyView = () => {
  const { t } = useTranslation()

  return (
    <View style={styles.placeholderView}>
      <LottieView source={burgerAnimation} style={styles.burgerStyle} autoPlay loop />
      <Typography
        variant={TypographyVariants.subhead}
        weight='bold'
        color={Colors.gunsmoke}
        style={styles.notFoundText}
      >
        {t('searchTruckModal:notFound')}
      </Typography>
      <Typography variant={TypographyVariants.body}>{t('searchTruckModal:placeholder')}</Typography>
    </View>
  )
}

export default memo(EmptyView)
