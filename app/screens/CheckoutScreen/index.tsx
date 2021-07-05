import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useReducer } from 'react'
// libs
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// components
import Header from 'components/Header'
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import Divider from 'components/Divider'
import ScreenContainer from 'components/ScreenContainer'
import Totals from 'components/Totals'
import PickUpFields from 'screens/CheckoutScreen/components/PickUpFields'
import DeliveryFields from 'screens/CheckoutScreen/components/DeliveryFields'
import PersonalInfoFields from 'screens/CheckoutScreen/components/PersonalInfoFields'
import TimeField from 'screens/CheckoutScreen/components/TimeField'
import PaymentMethodField from 'screens/CheckoutScreen/components/PaymentMethodField'
// thunks + actions
import { createOrder, createDeliveryQuotes } from 'store/orders/thunks'
import { clearOrderItems } from 'store/orders/model'
import { signIn } from 'store/auth/thunks'
import { getCreditCards } from 'store/payments/thunks'
// selectors
import { currentPositionSelector } from 'store/general/selectors'
import { truckSelector } from 'store/trucks/selectors'
import { currentProfileSelector, isAuthorizedSelector } from 'store/auth/selectors'
import { cardsSelector } from 'store/payments/selectors'
import { orderAmountSelector } from 'store/orders/selectors'
// types
import { AppDispatch } from 'store'
import { CreateDeliveryQuoteResponse, DeliveryType } from 'store/orders/types'
import { PaymentBrand, PaymentMethodType } from 'store/payments/types'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// validation
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaValidation } from './validation'
// assets
import PersonIcon from 'assets/svg/person-walking.svg'
import TruckIcon from 'assets/svg/truck.svg'
// styles
import { Colors, Spacing } from 'styles'
import styles from './styles'
// hooks
import { useMakeCardPayment, NotPayedOrder, useTotals } from './hooks'
// services
import { showErrorAlert } from 'services/api/axios'

export interface ICreateOrderFormData {
  type: DeliveryType
  paymentMethod: PaymentMethodType
  deliveryAddress: { address: string; lat: number; lng: number }
  orderTime: string
  client: {
    name: string
    email: string
    phone: string
  }
}

type State = {
  isLoading: boolean
  quote: CreateDeliveryQuoteResponse | null
}

const initialState = {
  isLoading: false,
  quote: null,
}

const CheckoutScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.CheckoutScreen>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const insets = useSafeAreaInsets()

  const { isApplePaySupported, makeCardPayment } = useMakeCardPayment()

  const currentPosition = useSelector(currentPositionSelector)

  const currentTruck = useSelector(truckSelector)

  const isAuthorized = useSelector(isAuthorizedSelector)

  const currentProfile = useSelector(currentProfileSelector)

  const orderAmount = useSelector(orderAmountSelector)

  const cards = useSelector(cardsSelector)

  const [{ isLoading, quote }, setState] = useReducer(
    (store: State, newStore: Partial<State>) => ({ ...store, ...newStore }),
    initialState,
  )

  const notPayedOrder = useRef<NotPayedOrder | null>(null)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ICreateOrderFormData>({
    defaultValues: {
      type: DeliveryType.PICKUP,
      client: {
        email: currentProfile?.email,
        phone: currentProfile?.phone,
        name: currentProfile?.name,
      },
    },
    context: { isAuthorized: false },
    resolver: yupResolver(schemaValidation),
  })

  const typeDelivery = watch('type')

  const totals = useTotals({ currentTruckTax: currentTruck.tax, quoteFee: quote?.fee, orderAmount, typeDelivery })

  const redirectToSuccessModal = useCallback(
    (orderId: number) => {
      navigation.reset({
        index: 1,
        routes: [
          { name: Routes.RootNavigator },
          {
            name: Routes.SuccessOrderModal,
            params: { orderId: orderId },
          },
        ],
      })
    },
    [navigation],
  )

  useFocusEffect(
    useCallback(() => {
      // create payment after user has been verified
      const payAfterVerify = async () => {
        if (isAuthorized && notPayedOrder.current) {
          let error = null
          // create payment
          if (notPayedOrder.current?.paymentMethod === PaymentMethodType.card) {
            setState({ isLoading: true })
            error = (await makeCardPayment(notPayedOrder.current))?.error
            setState({ isLoading: false })
          }
          // redirect after success payment or if payment method is cash
          if (!error) {
            dispatch(clearOrderItems())
            redirectToSuccessModal(notPayedOrder.current.id)
            notPayedOrder.current = null
          }
        }
      }
      payAfterVerify()
    }, [redirectToSuccessModal, makeCardPayment, notPayedOrder, isAuthorized, dispatch]),
  )

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentProfile && !cards.length) {
        setState({ isLoading: true })
        await dispatch(getCreditCards())
        setState({ isLoading: false })
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
  }, [currentProfile, setValue])

  useEffect(() => {
    if (route.params?.paymentMethod) {
      setValue('paymentMethod', route.params.paymentMethod)
    }
    if (route.params?.address && route.params.lat && route.params.lng) {
      setValue('deliveryAddress', { address: route.params.address, lat: route.params.lat, lng: route.params.lng })
    }
  }, [route.params, setValue])

  useEffect(() => {
    if (isApplePaySupported) {
      navigation.setParams({ brand: PaymentBrand.applePay, paymentMethod: PaymentMethodType.card })
    }
  }, [isApplePaySupported, navigation])

  useEffect(() => {
    const fetchQuotes = async () => {
      if (typeDelivery === DeliveryType.DELIVERY && navigation.isFocused()) {
        const { orderTime, deliveryAddress } = getValues()
        if (deliveryAddress?.address) {
          setState({ isLoading: true })
          const resultQuote = await dispatch(
            createDeliveryQuotes({
              deliveryAddress: deliveryAddress.address,
              foodTruckId: currentTruck.id,
              deliveryLongitude: deliveryAddress.lng,
              deliveryLatitude: deliveryAddress.lat,
              orderTime,
            }),
          )
          if (createDeliveryQuotes.fulfilled.match(resultQuote)) {
            setState({ isLoading: false, quote: resultQuote.payload })
            return
          }
          if (createDeliveryQuotes.rejected.match(resultQuote)) {
            showErrorAlert('Error', resultQuote.payload?.data?.message || resultQuote.payload?.message)
          }
          setState({ isLoading: false })
        }
      }
    }
    fetchQuotes()
  }, [navigation, getValues, typeDelivery, currentTruck.id, dispatch, route.params?.address])

  const payment = useMemo(() => {
    return {
      paymentMethod: route.params?.paymentMethod,
      cardId: route.params?.cardId,
      brand: route.params?.brand,
      lastFourNumbers: route.params?.lastFourNumbers,
    }
  }, [route.params])

  const onSubmit = useCallback(
    async (data: ICreateOrderFormData) => {
      navigation.navigate(Routes.VerifyCodeScreen, { phoneNumber: data.client.phone, popRouteCount: 1 })
      setState({ isLoading: true })
      const result = await dispatch(createOrder({ ...data, deliveryQuoteId: quote?.id }))

      if (createOrder.fulfilled.match(result)) {
        const createdOrder = {
          id: result.payload.data.id,
          amount: result.payload.data.orderSum,
          paymentMethod: result.payload.data.paymentMethod,
          cardId: payment.cardId,
          cardBrand: payment.brand,
        }
        if (currentProfile) {
          if (result.payload.data.paymentMethod === PaymentMethodType.card) {
            const { error } = await makeCardPayment(createdOrder)
            if (error) {
              setState({ isLoading: false })
              return
            }
          }
          setState({ isLoading: false, quote: null })
          dispatch(clearOrderItems())
          redirectToSuccessModal(createdOrder.id)
          return
        }

        // Sign in user and redirect it to Verify Screen
        await dispatch(signIn({ phone: data.client.phone }))
        notPayedOrder.current = createdOrder
        setState({ isLoading: false })
        navigation.navigate(Routes.VerifyCodeScreen, { phoneNumber: data.client.phone, popRouteCount: 1 })
        return
      }
      setState({ isLoading: false })
    },
    [redirectToSuccessModal, navigation, dispatch, currentProfile, payment, makeCardPayment, quote],
  )

  const activeTypeColor = useCallback(
    (type: ICreateOrderFormData['type']) => (typeDelivery === type ? Colors.primary : Colors.midNightMoss),
    [typeDelivery],
  )

  const handlePaymentPress = useCallback(() => {
    navigation.navigate(Routes.PaymentScreen, {
      cardId: payment.cardId,
      paymentMethod: payment.paymentMethod,
      typeDelivery,
    })
  }, [navigation, payment, typeDelivery])

  const handlePressAddress = useCallback(() => {
    navigation.navigate(Routes.ChangeAddressModal, { prevScreen: Routes.CheckoutScreen })
  }, [navigation])

  const timeFieldLabel = useMemo(
    () => ({
      [DeliveryType.PICKUP]: t('checkoutScreen:pickupAt'),
      [DeliveryType.DELIVERY]: t('checkoutScreen:deliveryDate'),
    }),
    [t],
  )

  return (
    <ScreenContainer isLoading={isLoading} style={styles.screen}>
      <Header withBack title={t('checkoutScreen:headerTitle')} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentScroll}>
        <Controller
          name='type'
          control={control}
          render={({ field: { onChange } }) => (
            <View style={styles.deliveryTypes}>
              <Button type={ButtonTypes.basic} style={styles.deliveryBtn} onPress={() => onChange(DeliveryType.PICKUP)}>
                <PersonIcon style={styles.buttonIcon} fill={activeTypeColor(DeliveryType.PICKUP)} />
                <Typography color={activeTypeColor(DeliveryType.PICKUP)}>{t('checkoutScreen:pickUpBtn')}</Typography>
              </Button>
              {currentTruck.supportDelivery && (
                <Button
                  type={ButtonTypes.basic}
                  style={styles.deliveryBtn}
                  onPress={() => onChange(DeliveryType.DELIVERY)}
                >
                  <TruckIcon style={styles.buttonIcon} fill={activeTypeColor(DeliveryType.DELIVERY)} />
                  <Typography color={activeTypeColor(DeliveryType.DELIVERY)}>
                    {t('checkoutScreen:deliveryBtn')}
                  </Typography>
                </Button>
              )}
            </View>
          )}
        />

        {typeDelivery === DeliveryType.PICKUP && (
          <PickUpFields distance={currentTruck.distance} address={currentTruck.address} />
        )}

        {typeDelivery === DeliveryType.DELIVERY && (
          <DeliveryFields
            control={control}
            errors={errors}
            location={currentPosition}
            onPressAddress={handlePressAddress}
          />
        )}

        <Typography variant={TypographyVariants.subhead} style={styles.label}>
          {timeFieldLabel[typeDelivery]}
        </Typography>

        <TimeField shouldUnregister name='orderTime' control={control} />

        <PaymentMethodField onPress={handlePaymentPress} payment={payment} errors={errors} />

        <Typography variant={TypographyVariants.subhead} style={styles.label}>
          {t('checkoutScreen:personalInfo')}
        </Typography>
        <PersonalInfoFields editable control={control} errors={errors} />

        <Typography variant={TypographyVariants.smallBody} color={Colors.midNightMoss}>
          <Typography color={Colors.cadmiumOrange}>*</Typography>
          {t('checkoutScreen:note')}
        </Typography>
      </ScrollView>

      <Divider />

      <View style={[styles.totals, { paddingBottom: insets.bottom + Spacing.base }]}>
        <Totals totals={totals} />
        <Button
          type={ButtonTypes.primary}
          title={`${t('checkoutScreen:submitBtn')}`}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScreenContainer>
  )
}

export default memo(CheckoutScreen)
