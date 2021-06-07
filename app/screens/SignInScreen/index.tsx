import React, { useCallback, useState, memo, FC } from 'react'
// libs
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackScreenProps } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
// components
import Header from 'components/Header'
import Button from 'components/Button'
import Divider from 'components/Divider'
import Input from 'components/Form/Input'
import Typography, { TypographyVariants } from 'components/Typography'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// services
import { formatPhoneNumber } from 'services/utils'
// assets
import FlagIcon from 'assets/svg/flag.svg'
import ChevronIcon from 'assets/svg/chevron.svg'
// styles
import styles from './styles'
import { Colors, Spacing } from 'styles'

const SignInScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.SignInScreen>> = () => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const [phoneNumber, setPhoneNumber] = useState('')

  const handleChange = useCallback((value) => {
    setPhoneNumber(formatPhoneNumber(value))
  }, [])

  const handleSubmit = useCallback(() => {
    console.log('submit')
  }, [])

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack />
      <View style={styles.content}>
        <Typography variant={TypographyVariants.h3} style={styles.title}>
          {t('signInScreen:title')}
        </Typography>
        <Typography variant={TypographyVariants.body} color={Colors.gunsmoke} style={styles.subhead}>
          {t('signInScreen:subhead')}
        </Typography>
        <View style={[styles.row, styles.inputWrap]}>
          <View style={styles.row}>
            <FlagIcon style={{ marginRight: Spacing.base }} />
            <ChevronIcon />
          </View>
          <Input
            withError={false}
            leftIcon={() => <Typography>+1</Typography>}
            style={styles.inputPhoneNumber}
            value={phoneNumber}
            onChangeText={handleChange}
          />
          <Divider style={styles.divider} />
        </View>
        <Button title={t('signInScreen:signInButton')} onPress={handleSubmit} />
      </View>
    </View>
  )
}

export default memo(SignInScreen)
