import React, { FC, useCallback, memo, useState, useMemo } from 'react'
// libs
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import { CardField, useConfirmSetupIntent } from '@stripe/stripe-react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackScreenProps } from '@react-navigation/stack'
// components
import Header from 'components/Header'
import Typography, { TypographyVariants } from 'components/Typography'
import Button from 'components/Button'
import Divider from 'components/Divider'
import ScreenContainer from 'components/ScreenContainer'
// thunks + actions
import { addCreditCard } from 'store/payments/thunks'
import { addCard } from 'store/payments/model'
// types
import { AppDispatch } from 'store'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// services
import { showErrorAlert } from 'services/api/axios'
// styles
import { Colors, Spacing } from 'styles'
import styles from './styles'
import { CardFieldInput } from '@stripe/stripe-react-native/src/types/index'

const CardModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.VerifyCodeScreen>> = ({ navigation }) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const { confirmSetupIntent } = useConfirmSetupIntent()

  const dispatch = useDispatch<AppDispatch>()

  const [isLoading, setLoading] = useState<boolean>(false)

  const [card, setCard] = useState<CardFieldInput.Details>()

  const handleSaveCard = useCallback(async () => {
    if (card) {
      setLoading(true)
      const result = await dispatch(addCreditCard())
      if (addCreditCard.fulfilled.match(result)) {
        const { error } = await confirmSetupIntent(result.payload.clientSecret, { type: 'Card' })
        if (error) {
          setLoading(false)
          showErrorAlert(t('errors:stripeError'), error.message)
          return
        }
        dispatch(addCard({ id: result.payload.cardId, brand: card.brand.toLowerCase(), lastFourNumbers: card.last4 }))
        setLoading(false)
        navigation.goBack()
        return
      }
      setLoading(false)
    }
  }, [dispatch, confirmSetupIntent, navigation, card, t])

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
    <ScreenContainer style={[styles.screen, { paddingTop: insets.top + Spacing.large }]} isLoading={isLoading}>
      <KeyboardAvoidingView style={styles.modal} behavior='padding' enabled={Platform.OS === 'ios'}>
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
            onCardChange={setCard}
          />

          <Typography variant={TypographyVariants.smallBody} color={Colors.midNightMoss}>
            <Typography color={Colors.cadmiumOrange}>*</Typography>
            {t('cardModal:note')}
          </Typography>
        </View>
        <View>
          <Divider />
          <Button
            disabled={!card?.complete}
            style={{
              marginTop: Spacing.double,
              marginHorizontal: Spacing.double,
              marginBottom: Spacing.double + insets.bottom,
            }}
            title={t('cardModal:saveCard')}
            onPress={handleSaveCard}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}

export default memo(CardModal)
