import React, { useCallback, useState, memo, FC } from 'react'
// libs
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackScreenProps } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
// components
import Header from 'components/Header'
import Button from 'components/Button'
import Divider from 'components/Divider'
import Input from 'components/Form/Input'
import Typography, { TypographyVariants } from 'components/Typography'
import Spinner from 'components/Spinner'
// thunks
import { signIn } from 'store/auth/thunks'
import { AppDispatch } from 'store'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// services
// import { formatPhoneNumber, onlyNumbers } from 'services/utils'
// assets
import FlagIcon from 'assets/svg/flag.svg'
import ChevronIcon from 'assets/svg/chevron.svg'
// styles
import styles from './styles'
import { Colors, Spacing } from 'styles'

const PHONE_CODE = '+1'

const SignInScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.SignInScreen>> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const [isLoading, setLoading] = useState<boolean>(false)

  const handleChange = useCallback((value) => {
    // setPhoneNumber(formatPhoneNumber(value))
    setPhoneNumber(value)
  }, [])

  const handleSubmit = useCallback(async () => {
    // const phone = `${PHONE_CODE}${onlyNumbers(phoneNumber)}`
    const phone = phoneNumber
    setLoading(true)
    await dispatch(signIn({ phone }))
    setLoading(false)
    navigation.navigate(Routes.VerifyCodeScreen, { phoneNumber: phone, popRouteCount: 2 })
  }, [navigation, phoneNumber, dispatch])

  const renderCode = useCallback(() => <Typography variant={TypographyVariants.body}>{PHONE_CODE}</Typography>, [])

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
            leftIcon={renderCode}
            containerStyle={styles.inputContainerStyle}
            style={styles.inputPhoneNumber}
            value={phoneNumber}
            onChangeText={handleChange}
          />
          <Divider style={styles.divider} />
        </View>
        <Button disabled={!phoneNumber.length} title={t('signInScreen:signInButton')} onPress={handleSubmit} />
      </View>
      {isLoading && <Spinner />}
    </View>
  )
}

export default memo(SignInScreen)
