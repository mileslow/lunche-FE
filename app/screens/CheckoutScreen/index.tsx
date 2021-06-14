import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
// libs
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import find from 'lodash.find'
// components
import Header from 'components/Header'
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import Divider from 'components/Divider'
import Spinner from 'components/Spinner'
import PickUpFields from 'screens/CheckoutScreen/components/PickUpFields'
import DeliveryFields from 'screens/CheckoutScreen/components/DeliveryFields'
import PersonalInfoFields from 'screens/CheckoutScreen/components/PersonalInfoFields'
import TimeField from 'screens/CheckoutScreen/components/TimeField'
import PaymentMethodField from 'screens/CheckoutScreen/components/PaymentMethodField'
// thunks
import { createOrder } from 'store/orders/thunks'
import { signIn } from 'store/auth/thunks'
import { createPayment, getCreditCards } from 'store/payments/thunks'
// selectors
import { currentAddressSelector } from 'store/general/selectors'
import { truckSelector } from 'store/trucks/selectors'
import { currentProfileSelector, isAuthorizedSelector } from 'store/auth/selectors'
import { cardsSelector } from 'store/payments/selectors'
// types
import { AppDispatch } from 'store'
import { DeliveryType, PaymentMethodType } from 'store/orders/types'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// validation
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaValidation } from './validation'
// assets
import PersonIcon from 'assets/svg/person-walking.svg'
import TruckIcon from 'assets/svg/truck.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'

export interface ICreateOrderFormData {
  type: DeliveryType
  paymentMethod: PaymentMethodType
  deliveryAddress: string
  orderTime: string
  client: {
    name: string
    email: string
    phone: string
  }
}
const CheckoutScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.CheckoutScreen>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const currentAddress = useSelector(currentAddressSelector)

  const currentTruck = useSelector(truckSelector)

  const isAuthorized = useSelector(isAuthorizedSelector)

  const currentProfile = useSelector(currentProfileSelector)

  const cards = useSelector(cardsSelector)

  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ICreateOrderFormData>({
    defaultValues: {
      type: DeliveryType.pickup,
      client: {
        email: currentProfile?.email,
        phone: currentProfile?.phone,
        name: currentProfile?.name,
      },
    },
    context: { isAuthorized },
    resolver: yupResolver(schemaValidation),
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthorized && currentProfile && !cards.length) {
        setLoading(true)
        const cardResult = await dispatch(getCreditCards({ id: currentProfile.id }))
        if (getCreditCards.fulfilled.match(cardResult)) {
          navigation.setParams({
            cardId: cardResult.payload[0].id,
            paymentMethod: cardResult.payload[0] && PaymentMethodType.card,
          })
        }
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  useEffect(() => {
    if (currentProfile) {
      setValue('client', {
        email: currentProfile.email,
        phone: currentProfile.phone,
        name: currentProfile.name,
      })
    }
    if (route.params?.paymentMethod) {
      setValue('paymentMethod', route.params.paymentMethod)
    }
  }, [currentProfile, setValue, route.params?.paymentMethod])

  const typeDelivery = watch('type')

  const onSubmit = useCallback(
    async (data: ICreateOrderFormData) => {
      setLoading(true)
      const result = await dispatch(createOrder(data))
      if (createOrder.fulfilled.match(result)) {
        // User has already authorized because he chose card
        if (data.paymentMethod === PaymentMethodType.card) {
          await dispatch(createPayment({ id: result.payload.id, params: { cardId: route.params?.cardId } }))
          setLoading(false)
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.MainTabsStack }],
          })
          return
        }

        if (isAuthorized) {
          setLoading(false)
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.MainTabsStack }],
          })
          return
        }

        await dispatch(signIn({ phone: data.client.phone }))
        setLoading(false)
        navigation.navigate(Routes.VerifyCodeScreen, { phoneNumber: data.client.phone })
      }
    },
    [navigation, dispatch, isAuthorized, route.params?.cardId],
  )

  const activeTypeColor = useCallback(
    (type: ICreateOrderFormData['type']) => (typeDelivery === type ? Colors.primary : Colors.midNightMoss),
    [typeDelivery],
  )

  const payment = useMemo(
    () => ({ paymentMethod: route.params?.paymentMethod, card: find(cards, ['id', route.params?.cardId]) }),
    [route.params, cards],
  )

  const handlePaymentPress = useCallback(() => {
    if (isAuthorized) {
      navigation.navigate(Routes.PaymentScreen, {
        cardId: payment.card?.id,
        paymentMethod: payment.paymentMethod,
        typeDelivery,
      })
    } else {
      navigation.navigate(Routes.SignInScreen)
    }
  }, [navigation, payment, typeDelivery, isAuthorized])

  const timeFieldLabel = useMemo(
    () => ({
      [DeliveryType.pickup]: t('checkoutScreen:pickupAt'),
      [DeliveryType.delivery]: t('checkoutScreen:deliveryDate'),
    }),
    [t],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack title={t('checkoutScreen:headerTitle')} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentScroll}>
        <Controller
          name='type'
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.deliveryTypes}>
              <Button type={ButtonTypes.basic} style={styles.deliveryBtn} onPress={() => onChange(DeliveryType.pickup)}>
                <PersonIcon style={styles.buttonIcon} fill={activeTypeColor(DeliveryType.pickup)} />
                <Typography color={activeTypeColor(DeliveryType.pickup)}>{t('checkoutScreen:pickUpBtn')}</Typography>
              </Button>
              {currentTruck.supportDelivery && (
                <Button
                  type={ButtonTypes.basic}
                  style={styles.deliveryBtn}
                  onPress={() => onChange(DeliveryType.delivery)}
                >
                  <TruckIcon style={styles.buttonIcon} fill={activeTypeColor(DeliveryType.delivery)} />
                  <Typography color={activeTypeColor(DeliveryType.delivery)}>
                    {t('checkoutScreen:deliveryBtn')}
                  </Typography>
                </Button>
              )}
            </View>
          )}
        />

        {typeDelivery === DeliveryType.pickup && (
          <PickUpFields distance={currentTruck.distance} address={currentTruck.address} />
        )}

        {typeDelivery === DeliveryType.delivery && (
          <DeliveryFields control={control} errors={errors} address={currentAddress} />
        )}

        <Typography variant={TypographyVariants.subhead} style={styles.label}>
          {timeFieldLabel[typeDelivery]}
        </Typography>

        <TimeField shouldUnregister name='orderTime' control={control} />

        <PaymentMethodField onPress={handlePaymentPress} payment={payment} errors={errors} />

        <PersonalInfoFields editable={!isAuthorized} control={control} errors={errors} />

        <Typography variant={TypographyVariants.smallBody} color={Colors.midNightMoss}>
          <Typography color={Colors.cadmiumOrange}>*</Typography>
          {t('checkoutScreen:note')}
        </Typography>
      </ScrollView>

      <Divider />

      <Button
        type={ButtonTypes.primary}
        title={`${t('checkoutScreen:submitBtn')}`}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      />

      {isLoading && <Spinner />}
    </View>
  )
}

export default memo(CheckoutScreen)
