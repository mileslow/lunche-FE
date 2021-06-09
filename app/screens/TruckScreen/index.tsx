import React, { useCallback, FC, useEffect, useState, memo } from 'react'
// libs
import { ImageBackground, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import allSettled from 'promise.allsettled'
// components
import CategoriesList from 'components/CategoriesList'
import StringList from 'components/StringList'
import InfoWithIconList from 'components/InfoWithIconList'
import SearchButton from 'components/Button/SearchButton'
import Typography, { TypographyVariants } from 'components/Typography'
import TruckGradient from 'screens/TruckScreen/components/TruckGradient'
import Header from 'screens/TruckScreen/components/Header'
import MenuItems from 'screens/TruckScreen/components/MenuItems'
import Spinner from 'components/Spinner'
import Divider from 'components/Divider'
import Button, { ButtonTypes } from 'components/Button'
// store
import { AppDispatch } from 'store'
import { truckSelector, truckCategoriesSelector } from 'store/trucks/selectors'
import { getTruck, getTruckMenuItems } from 'store/trucks/thunks'
import { clearTruckScreen } from 'store/commonActions'
import { getFoodTypes } from 'store/foodTypes/thunks'
import { foodTypesSelector } from 'store/foodTypes/selectors'
import { orderAmountSelector, orderItemsSelector } from 'store/orders/selectors'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// hooks
import useTruckInfo from 'hooks/useTruckInfo'
import useAnimatedHeader from 'hooks/useAnimatedHeader'
import useToggleFavoritePress from 'hooks/useToggleFavoritePress'
// utils
import { getImageBySize } from 'services/utils'
// styles
import styles from './styles'
import { Colors, Metrics } from 'styles'

const TruckScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.TruckScreen>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const [isLoading, setLoading] = useState<boolean>(false)

  const [selectedTypes, setSelectedTypes] = useState<number[]>([])

  const currentTruck = useSelector(truckSelector)

  const truckCategories = useSelector(truckCategoriesSelector)

  const foodTypes = useSelector(foodTypesSelector)

  const orderItems = useSelector(orderItemsSelector)

  const orderAmount = useSelector(orderAmountSelector)

  const translationY = useSharedValue(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await allSettled([
        dispatch(getTruck(route.params.id)),
        dispatch(getFoodTypes(route.params.id)),
        dispatch(getTruckMenuItems({ id: route.params.id })),
      ])
      setLoading(false)
    }
    fetchData()
    return () => {
      dispatch(clearTruckScreen())
    }
  }, [dispatch, setLoading, route.params.id])

  const { endAnimPosition } = useAnimatedHeader()

  const info = useTruckInfo(currentTruck)

  const redirectToAbout = useCallback(() => {
    navigation.navigate(Routes.AboutTruckScreen)
  }, [navigation])

  const handlePressFoodType = useCallback(
    (id) => {
      const foodTypeIds = new Set(selectedTypes)
      foodTypeIds.has(id) ? foodTypeIds.delete(id) : foodTypeIds.add(id)
      setSelectedTypes([...foodTypeIds])
    },
    [selectedTypes, setSelectedTypes],
  )

  const handleGoToCart = useCallback(() => {
    navigation.navigate(Routes.CartScreen)
  }, [navigation])

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const subNavStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value < endAnimPosition ? 0 : translationY.value - endAnimPosition }],
  }))

  const { toggleFavoritePress, isLoadingFavorite } = useToggleFavoritePress()

  return (
    <View style={styles.screen}>
      <Header isFavorite={currentTruck.isFavorite} translationY={translationY} onFavoritePress={toggleFavoritePress} />

      <Animated.ScrollView
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.truckInfo}>
          {currentTruck.mainPhoto ? (
            <ImageBackground
              style={styles.truckImage}
              source={{
                uri: getImageBySize(currentTruck.mainPhoto, Metrics.truckImgWidth, Metrics.truckImgHeight),
              }}
            />
          ) : null}
          <TruckGradient />
          <View style={styles.truckTitle}>
            <View style={styles.titleWrap}>
              <Typography
                variant={TypographyVariants.subhead}
                color={Colors.basic}
                style={styles.subhead}
                numberOfLines={2}
              >
                {currentTruck.name}
              </Typography>
            </View>
            <Typography
              variant={TypographyVariants.smallBody}
              color={Colors.basic}
              style={[styles.subhead, styles.underLine]}
              onPress={redirectToAbout}
            >
              {t('truckScreen:aboutUs')}
            </Typography>
          </View>
          <StringList data={truckCategories} color={Colors.basic} style={styles.categories} />
          <InfoWithIconList data={info} color={Colors.basic} style={styles.info} />
        </View>

        <Animated.View style={[styles.animSubNavigation, subNavStyle]}>
          <View style={styles.subNavigation}>
            <Typography variant={TypographyVariants.h3}>{t('truckScreen:menuTitle')}</Typography>
            <SearchButton onPress={() => null} />
          </View>
          <CategoriesList active={selectedTypes} data={foodTypes} onPress={handlePressFoodType} />
        </Animated.View>

        <MenuItems truckId={currentTruck.id} selectedTypes={selectedTypes} orderItems={orderItems} />
      </Animated.ScrollView>

      {orderAmount ? (
        <View style={styles.buttonWrap}>
          <Divider />
          <Button
            type={ButtonTypes.primary}
            title={`${t('truckScreen:redirectButton')} ($ ${orderAmount})`}
            style={styles.button}
            onPress={handleGoToCart}
          />
        </View>
      ) : null}

      {(isLoading || isLoadingFavorite) && <Spinner />}
    </View>
  )
}

export default memo(TruckScreen)
