import React, { FC, useCallback, memo, useState, useMemo } from 'react'
// libs
import { View } from 'react-native'
import { CardField, StripeProvider, useConfirmSetupIntent } from '@stripe/stripe-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackScreenProps } from '@react-navigation/stack'
// components
import Header from 'components/Header'
import Typography, { TypographyVariants } from 'components/Typography'
import Button from 'components/Button'
import Divider from 'components/Divider'
import Spinner from 'components/Spinner'
// thunks
import { addCreditCard, getCreditCards } from 'store/payments/thunks'
// selectors
import { currentProfileSelector } from 'store/auth/selectors'
// types
import { AppDispatch } from 'store'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// styles
import { Colors, Spacing } from 'styles'
import styles from './styles'

const CardModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.VerifyCodeScreen>> = ({ navigation }) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const { confirmSetupIntent } = useConfirmSetupIntent()

  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(currentProfileSelector)

  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSaveCard = useCallback(async () => {
    if (user) {
      setLoading(true)
      const result = await dispatch(addCreditCard({ id: user.id }))
      if (addCreditCard.fulfilled.match(result)) {
        await confirmSetupIntent(result.payload.clientSecret, { type: 'Card' })
        await dispatch(getCreditCards({ id: user.id }))
        navigation.goBack()
      }
      setLoading(false)
    }
  }, [user, dispatch, confirmSetupIntent, navigation])

  const cardStyle = useMemo(
    () => ({
      textColor: Colors.midNightMoss,
      backgroundColor: Colors.alabaster,
      placeholderColor: Colors.gunsmoke,
      borderWidth: 1,
      borderColor: '#8686861A',
      borderRadius: 8,
    }),
    [],
  )

  return (
    <StripeProvider publishableKey='pk_test_Hed0FjAaOANNuc90lfjLFlm4'>
      <View style={[styles.screen, { paddingTop: insets.top + Spacing.large }]}>
        <View style={styles.modal}>
          <Header withBack title={t('cardModal:headerTitle')} />
          <View style={styles.content}>
            <Typography variant={TypographyVariants.body}>{t('cardModal:cardDetails')}</Typography>
            <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={cardStyle}
              style={styles.cardFieldStyle}
            />

            <Typography variant={TypographyVariants.smallBody} color={Colors.midNightMoss}>
              <Typography color={Colors.cadmiumOrange}>*</Typography>
              {t('cardModal:note')}
            </Typography>
          </View>
          <View>
            <Divider />
            <Button style={{ margin: Spacing.double }} title={t('cardModal:saveCard')} onPress={handleSaveCard} />
          </View>
        </View>
        {isLoading && <Spinner />}
      </View>
    </StripeProvider>
  )
}

export default memo(CardModal)
