import React, { FC, memo, useCallback, useEffect, useMemo, useState, useRef } from 'react'
// libs
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/core'
// components
import Header from 'components/Header'
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import Divider from 'components/Divider'
import Spinner from 'components/Spinner'
import ScreenContainer from 'components/ScreenContainer'
import PickUpFields from 'screens/CheckoutScreen/components/PickUpFields'
import DeliveryFields from 'screens/CheckoutScreen/components/DeliveryFields'
import PersonalInfoFields from 'screens/CheckoutScreen/components/PersonalInfoFields'
import TimeField from 'screens/CheckoutScreen/components/TimeField'
import PaymentMethodField from 'screens/CheckoutScreen/components/PaymentMethodField'
// thunks + actions
import { createOrder } from 'store/orders/thunks'
import { clearOrderItems } from 'store/orders/model'
import { signIn } from 'store/auth/thunks'
import { getCreditCards } from 'store/payments/thunks'
// selectors
import { currentAddressSelector } from 'store/general/selectors'
import { truckSelector } from 'store/trucks/selectors'
import { currentProfileSelector, isAuthorizedSelector } from 'store/auth/selectors'
import { cardsSelector } from 'store/payments/selectors'
// types
import { AppDispatch } from 'store'
import { DeliveryType } from 'store/orders/types'
import { PaymentBrand, PaymentMethodType } from 'store/payments/types'
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
// hooks
import { useMakeCardPayment, NotPayedOrder } from './hooks'

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
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const { isApplePaySupported, makeCardPayment } = useMakeCardPayment()

  const currentAddress = useSelector(currentAddressSelector)

  const currentTruck = useSelector(truckSelector)

  const isAuthorized = useSelector(isAuthorizedSelector)

  const currentProfile = useSelector(currentProfileSelector)

  const cards = useSelector(cardsSelector)

  const [isLoading, setLoading] = useState(false)

  const notPayedOrder = useRef<NotPayedOrder | null>(null)

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
    context: { isAuthorized: false },
    resolver: yupResolver(schemaValidation),
  })

  useFocusEffect(
    useCallback(() => {
      // create payment after user has been verified
      if (isAuthorized && notPayedOrder.current && notPayedOrder.current?.paymentMethod === PaymentMethodType.card) {
        setLoading(true)
        makeCardPayment(notPayedOrder.current).then(({ error }) => {
          setLoading(false)
          if (!error) {
            notPayedOrder.current = null
            dispatch(clearOrderItems())
            navigation.navigate(Routes.SuccessOrderModal)
          }
        })
      }
    }, [navigation, makeCardPayment, notPayedOrder, isAuthorized, dispatch]),
  )

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentProfile && !cards.length) {
        setLoading(true)
        await dispatch(getCreditCards())
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
  }, [currentProfile, setValue])

  useEffect(() => {
    if (route.params?.paymentMethod) {
      setValue('paymentMethod', route.params.paymentMethod)
    }
  }, [route.params?.paymentMethod, setValue])

  useEffect(() => {
    if (isApplePaySupported) {
      navigation.setParams({ brand: PaymentBrand.applePay, paymentMethod: PaymentMethodType.card })
    }
  }, [isApplePaySupported, navigation])

  const typeDelivery = watch('type')

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
      setLoading(true)
      const result = await dispatch(createOrder(data))

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
              setLoading(false)
              return
            }
          }
          setLoading(false)
          dispatch(clearOrderItems())
          navigation.navigate(Routes.SuccessOrderModal)
          return
        }

        // Sign in user and redirect it to Verify Screen
        await dispatch(signIn({ phone: data.client.phone }))
        notPayedOrder.current = result.payload.data.paymentMethod === PaymentMethodType.card ? createdOrder : null
        navigation.navigate(Routes.VerifyCodeScreen, { phoneNumber: data.client.phone, popRouteCount: 1 })
        return
      }
      setLoading(false)
    },
    [navigation, dispatch, currentProfile, payment, makeCardPayment],
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

  const timeFieldLabel = useMemo(
    () => ({
      [DeliveryType.pickup]: t('checkoutScreen:pickupAt'),
      [DeliveryType.delivery]: t('checkoutScreen:deliveryDate'),
    }),
    [t],
  )

  return (
    <ScreenContainer>
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

        <PersonalInfoFields editable control={control} errors={errors} />

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
    </ScreenContainer>
  )
}

export default memo(CheckoutScreen)
