import React, { FC, useState, memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CodeField } from 'react-native-confirmation-code-field'
import { useTranslation } from 'react-i18next'
import { StackScreenProps } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
// components
import Header from 'components/Header'
import Typography, { TypographyVariants } from 'components/Typography'
import Button from 'components/Button'
import Spinner from 'components/Spinner'
// thunks
import { signIn, signInConfirm, getCurrentProfile, updateProfileVerify } from 'store/auth/thunks'
// services
import { setAuthData } from 'services/storage'
import { showErrorAlert } from 'services/api/axios'
// types
import { AppDispatch } from 'store'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// styles
import { Colors } from 'styles'
import styles from './styles'

const CELL_COUNT = 4

export type VerifyThunks = 'updateProfileVerify' | 'signInConfirm'

const VerifyCodeScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.VerifyCodeScreen>> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const [code, setCode] = useState<string>('')

  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSignInConfirm = useCallback(async () => {
    setLoading(true)
    const result = await dispatch(signInConfirm({ code, phone: route.params.phoneNumber }))
    setLoading(false)
    if (signInConfirm.fulfilled.match(result)) {
      await setAuthData(result.payload)
      await dispatch(getCurrentProfile())
      return { error: '' }
    }
    return { error: t('errors:enterCorrectCode') }
  }, [route.params, code, dispatch, t])

  const handleUpdateProfileVerify = useCallback(async () => {
    if (route.params.userId) {
      setLoading(true)
      const result = await dispatch(updateProfileVerify({ id: route.params.userId, code }))
      setLoading(false)
      if (updateProfileVerify.rejected.match(result)) {
        return { error: t('errors:enterCorrectCode') }
      }
    }
    return { error: '' }
  }, [route.params, code, dispatch, t])

  const thunks = useMemo<{ [x in VerifyThunks]: () => Promise<{ error: string }> }>(
    () => ({
      signInConfirm: handleSignInConfirm,
      updateProfileVerify: handleUpdateProfileVerify,
    }),
    [handleSignInConfirm, handleUpdateProfileVerify],
  )

  const handleConfirm = useCallback(async () => {
    const { error } = await thunks[route.params.verifyThunk || 'signInConfirm']()

    if (error) {
      return showErrorAlert(t('errors:serverError'), error)
    }
    if (route.params?.prevScreen) {
      navigation.navigate(route.params.prevScreen, { successVerify: true })
      return
    }
    if (route.params?.popRouteCount) {
      navigation.pop(route.params.popRouteCount)
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.MainTabsStack }],
    })
  }, [thunks, navigation, route.params, t])

  const handleResendCode = useCallback(async () => {
    setLoading(true)
    await dispatch(signIn({ phone: route.params.phoneNumber }))
    setLoading(false)
  }, [dispatch, route.params.phoneNumber])

  const renderCell = useCallback(
    ({ index, symbol, isFocused }) => (
      <View key={index} style={styles.cell}>
        <Typography variant={TypographyVariants.body}>
          {symbol || (isFocused ? <View style={styles.cursor} /> : null)}
        </Typography>
      </View>
    ),
    [],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack />
      <View style={styles.content}>
        <Typography style={[styles.commonTextStyle, styles.title]} variant={TypographyVariants.h3}>
          {t('verifyCodeScreen:title')}
        </Typography>
        <Typography style={styles.commonTextStyle} variant={TypographyVariants.body}>
          {`${t('verifyCodeScreen:subhead')} ${route.params.phoneNumber}`}
        </Typography>
        <CodeField
          autoFocus
          rootStyle={styles.codeFieldRoot}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          keyboardType='number-pad'
          textContentType='oneTimeCode'
          renderCell={renderCell}
        />
        <Button
          style={styles.button}
          disabled={code.length < 4}
          title={t('verifyCodeScreen:confirmButton')}
          onPress={handleConfirm}
        />
        <View style={styles.resendBlock}>
          <Typography
            style={[styles.commonTextStyle, styles.notReceiveText]}
            variant={TypographyVariants.caption}
            color={Colors.gunsmoke}
          >
            {t('verifyCodeScreen:notReceive')}
          </Typography>
          <Typography
            style={styles.commonTextStyle}
            variant={TypographyVariants.caption}
            color={Colors.primary}
            onPress={handleResendCode}
          >
            {t('verifyCodeScreen:resend')}
          </Typography>
        </View>
        <Typography style={styles.commonTextStyle} variant={TypographyVariants.body} color={Colors.gunsmoke}>
          {t('verifyCodeScreen:terms')}
        </Typography>
      </View>
      {isLoading && <Spinner />}
    </View>
  )
}

export default memo(VerifyCodeScreen)
