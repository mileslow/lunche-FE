import React, { FC, memo, useCallback, useState } from 'react'
// libs
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
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
// thunks
import { createOrder } from 'store/orders/thunks'
// selectors
import { currentAddressSelector } from 'store/general/selectors'
import { truckSelector } from 'store/trucks/selectors'
// types
import { AppDispatch } from 'store'
import { DeliveryType } from 'store/orders/types'
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
  type: keyof typeof DeliveryType
  deliveryAddress: string
  orderTime: string
  client: {
    name: string
    email: string
    phone: string
  }
}
const CheckoutScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.CheckoutScreen>> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const currentAddress = useSelector(currentAddressSelector)

  const currentTruck = useSelector(truckSelector)

  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateOrderFormData>({
    defaultValues: {
      type: DeliveryType.pickup,
      deliveryAddress: currentAddress,
    },
    resolver: yupResolver(schemaValidation),
  })

  const typeDelivery = watch('type')

  const onSubmit = useCallback(
    async (data: ICreateOrderFormData) => {
      setLoading(true)
      await dispatch(createOrder(data))
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.MainTabsStack }],
      })
    },
    [navigation, dispatch],
  )

  const activeTypeColor = useCallback(
    (type: ICreateOrderFormData['type']) => (typeDelivery === type ? Colors.primary : Colors.midNightMoss),
    [typeDelivery],
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

        {typeDelivery === DeliveryType.delivery && <DeliveryFields control={control} errors={errors} />}

        <TimeField shouldUnregister name='orderTime' control={control} />

        <PersonalInfoFields control={control} errors={errors} />

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
