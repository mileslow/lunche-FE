import React, { FC, memo, useCallback, useMemo, useState } from 'react'
// libs
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackScreenProps } from '@react-navigation/stack'
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
import { DeliveryType, PaymentMethodType } from 'store/orders/types'
import { cardsSelector } from 'store/payments/selectors'
// assets
import PlusRectIcon from 'assets/svg/plus-rectangle.svg'
// hooks
import useCreditCardIcon from 'hooks/useCreditCardIcon'
// types
import Routes from 'navigation/routes'
import { RootNavigationStackParamsList } from 'navigation'
// styles
import { Colors, Spacing } from 'styles'
import styles from './styles'

const PaymentScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.PaymentScreen>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const cards = useSelector(cardsSelector)

  const [payment, setPayment] = useState<{ paymentMethod: PaymentMethodType; cardId?: number }>({
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
          onPress={() => setPayment({ paymentMethod: PaymentMethodType.card, cardId: item.id })}
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
          onPress={() => setPayment({ paymentMethod: PaymentMethodType.cash, cardId: undefined })}
          item={{ text: t('paymentScreen:cache') }}
        />
      ) : null,
    [payment.paymentMethod, t, route.params.typeDelivery],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack title={t('paymentScreen:headerTitle')} />
      <View style={styles.content}>
        <Typography variant={TypographyVariants.body} style={{ marginBottom: Spacing.base }}>
          {t('paymentScreen:chooseMethod')}
        </Typography>

        {renderCashItem}
        {renderCards}

        <Button type={ButtonTypes.link} style={styles.addCard} onPress={handleAddCard}>
          <PlusRectIcon style={{ marginRight: Spacing.medium }} />
          <Typography variant={TypographyVariants.body} color={Colors.primary}>
            {t('paymentScreen:addNewCard')}
          </Typography>
        </Button>
      </View>
      <View>
        <Divider />
        <Button style={{ margin: Spacing.double }} title={t('paymentScreen:saveMethod')} onPress={handleSaveMethod} />
      </View>
    </View>
  )
}

export default memo(PaymentScreen)
