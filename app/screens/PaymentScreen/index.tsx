import React, { FC, memo, useCallback, useMemo, useState } from 'react'
// libs
import { View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackScreenProps } from '@react-navigation/stack'
import { useApplePay } from '@stripe/stripe-react-native'
import map from 'lodash.map'
import upperFirst from 'lodash.upperfirst'
// components
import Button, { ButtonTypes } from 'components/Button'
import Checkbox from 'components/Checkbox'
import Header from 'components/Header'
import ListItem from 'components/ListItem'
import Typography, { TypographyVariants } from 'components/Typography'
import Divider from 'components/Divider'
// store
import { DeliveryType } from 'store/orders/types'
import { cardsSelector } from 'store/payments/selectors'
// assets
import PlusRectIcon from 'assets/svg/plus-rectangle.svg'
// hooks
import useCreditCardIcon from 'hooks/useCreditCardIcon'
// types
import Routes from 'navigation/routes'
import { RootNavigationStackParamsList } from 'navigation'
import { PaymentType, PaymentBrand, PaymentMethodType } from 'store/payments/types'
// styles
import { Colors, Spacing } from 'styles'
import styles from './styles'

const PaymentScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.PaymentScreen>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const { isApplePaySupported } = useApplePay()

  const cards = useSelector(cardsSelector)

  const [payment, setPayment] = useState<PaymentType>({
    paymentMethod: route.params?.paymentMethod ?? PaymentMethodType.card,
    cardId: route.params?.cardId,
  })

  const cardIcons = useCreditCardIcon()

  const handleSaveMethod = useCallback(() => {
    navigation.navigate(Routes.CheckoutScreen, payment)
  }, [navigation, payment])

  const handleAddCard = useCallback(() => {
    navigation.navigate(Routes.CardModal)
  }, [navigation])

  const renderCards = useMemo(
    () =>
      map(cards, (item, index) => (
        <ListItem
          key={index}
          leftElement={() => <Checkbox type='radio' style={styles.methodItem} checked={payment.cardId === item.id} />}
          onPress={() =>
            setPayment({
              paymentMethod: PaymentMethodType.card,
              cardId: item.id,
              brand: item.brand,
              lastFourNumbers: item.lastFourNumbers,
            })
          }
          item={{ text: upperFirst(item.brand), subtext: `****${item.lastFourNumbers}` }}
          rightElement={() => cardIcons[item.brand]}
        />
      )),
    [cards, payment.cardId, cardIcons],
  )

  const renderCashItem = useMemo(
    () =>
      route.params.typeDelivery === DeliveryType.pickup ? (
        <ListItem
          leftElement={() => (
            <Checkbox
              type='radio'
              style={styles.methodItem}
              checked={payment.paymentMethod === PaymentMethodType.cash}
            />
          )}
          onPress={() => setPayment({ paymentMethod: PaymentMethodType.cash, cardId: undefined, brand: undefined })}
          item={{ text: t('paymentScreen:cash') }}
        />
      ) : null,
    [payment.paymentMethod, t, route.params.typeDelivery],
  )

  const applePayButton = useMemo(
    () =>
      isApplePaySupported ? (
        <ListItem
          leftElement={() => (
            <Checkbox type='radio' style={styles.methodItem} checked={payment.brand === PaymentBrand.applePay} />
          )}
          rightElement={() => cardIcons[PaymentBrand.applePay]}
          onPress={() =>
            setPayment({ paymentMethod: PaymentMethodType.card, cardId: undefined, brand: PaymentBrand.applePay })
          }
          item={{ text: t('common:applePay') }}
        />
      ) : null,
    [isApplePaySupported, cardIcons, payment, t],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack title={t('paymentScreen:headerTitle')} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Typography variant={TypographyVariants.body} style={{ marginBottom: Spacing.base }}>
          {t('paymentScreen:chooseMethod')}
        </Typography>

        {renderCashItem}
        {renderCards}
        {applePayButton}

        <Button type={ButtonTypes.link} style={styles.addCard} onPress={handleAddCard}>
          <PlusRectIcon style={{ marginRight: Spacing.medium }} />
          <Typography variant={TypographyVariants.body} color={Colors.primary}>
            {t('paymentScreen:addNewCard')}
          </Typography>
        </Button>
      </ScrollView>
      <View>
        <Divider />
        <Button style={{ margin: Spacing.double }} title={t('paymentScreen:saveMethod')} onPress={handleSaveMethod} />
      </View>
    </View>
  )
}

export default memo(PaymentScreen)
