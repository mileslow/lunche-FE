import React, { FC, memo, useCallback, useState } from 'react'
// libs
import { View, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import round from 'lodash.round'
// components
import Header from 'components/Header'
import Button, { ButtonTypes } from 'components/Button'
import Typography, { TypographyVariants } from 'components/Typography'
import Input from 'components/HookForm/Input'
import Divider from 'components/Divider'
import Spinner from 'components/Spinner'
// thunks
import { createOrder } from 'store/orders/thunks'
// selectors
import { currentAddressSelector } from 'store/general/selectors'
import { truckSelector } from 'store/trucks/selectors'
// types
import { DeliveryType } from 'store/orders/types'
import { RootNavigationStackParamsList, Routes } from 'navigation'
// validation
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaValidation } from './validation'
// assets
import PersonIcon from 'assets/svg/person-walking.svg'
import TruckIcon from 'assets/svg/truck.svg'
import ClockIcon from 'assets/svg/clock1.svg'
import ProfileIcon from 'assets/svg/profile.svg'
import MailIcon from 'assets/svg/mail.svg'
import PhoneIcon from 'assets/svg/phone.svg'
import AddressIcon from 'assets/svg/address.svg'
import DistanceIcon from 'assets/svg/distance.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'
import { AppDispatch } from 'store'
import { StackScreenProps } from '@react-navigation/stack'

export interface ICreateOrderFormData {
  type: keyof typeof DeliveryType
  deliveryAddress: string
  deliveryDate: string
  pickupTime: string
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
            </View>
          )}
        />
        {typeDelivery === DeliveryType.pickup && (
          <>
            <Typography variant={TypographyVariants.subhead} style={styles.label}>
              {t('checkoutScreen:pickUpAddress')}
            </Typography>
            <View style={styles.readOnlyField}>
              <View style={styles.readonlyFieldPart}>
                <AddressIcon fill={Colors.midNightMoss} style={styles.addressIcon} />
                <Typography variant={TypographyVariants.body}>{currentTruck.address}</Typography>
              </View>
              <View style={styles.readonlyFieldPart}>
                <DistanceIcon style={styles.addressIcon} />
                <Typography variant={TypographyVariants.body}>{round(currentTruck.distance / 1000, 2)} km</Typography>
              </View>
            </View>

            <Typography variant={TypographyVariants.subhead} style={styles.label}>
              {t('checkoutScreen:pickUpLabel')}
            </Typography>
            <Input
              shouldUnregister
              control={control}
              name='pickupTime'
              defaultValue={t('checkoutScreen:asap')}
              autoCapitalize='none'
              autoCorrect={false}
              error={errors?.pickupTime?.message}
              leftIcon={<ClockIcon />}
            />
          </>
        )}
        {typeDelivery === DeliveryType.delivery && (
          <>
            <Typography variant={TypographyVariants.subhead} style={styles.label}>
              {t('checkoutScreen:deliverAddress')}
            </Typography>
            <Input
              shouldUnregister
              control={control}
              name='deliveryAddress'
              defaultValue={currentAddress}
              autoCapitalize='none'
              autoCorrect={false}
              error={errors?.deliveryAddress?.message}
              leftIcon={<AddressIcon fill={Colors.midNightMoss} />}
            />

            <Typography variant={TypographyVariants.subhead} style={styles.label}>
              {t('checkoutScreen:deliveryDate')}
            </Typography>
            <Input
              shouldUnregister
              control={control}
              name='deliveryDate'
              defaultValue={t('checkoutScreen:asap')}
              autoCapitalize='none'
              autoCorrect={false}
              error={errors?.deliveryDate?.message}
              leftIcon={<ClockIcon />}
            />
          </>
        )}

        <Typography variant={TypographyVariants.subhead} style={styles.label}>
          {t('checkoutScreen:personalInfo')}
        </Typography>
        <Input
          control={control}
          name='client.name'
          autoCapitalize='none'
          autoCorrect={false}
          error={errors?.client?.name?.message}
          leftIcon={<ProfileIcon fill={Colors.midNightMoss} />}
        />
        <Input
          control={control}
          name='client.email'
          autoCapitalize='none'
          autoCompleteType='email'
          autoCorrect={false}
          keyboardType='email-address'
          error={errors?.client?.email?.message}
          leftIcon={<MailIcon />}
        />

        <Input
          control={control}
          name='client.phone'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='phone-pad'
          error={errors?.client?.phone?.message}
          leftIcon={<PhoneIcon fill={Colors.midNightMoss} />}
        />
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
