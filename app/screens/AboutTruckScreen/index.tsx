import React, { useCallback, useMemo, useState, memo, FC } from 'react'
// libs
import { View, Image, ScrollView } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { StackScreenProps } from '@react-navigation/stack'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import map from 'lodash.map'
import dayjs from 'dayjs'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import StringList from 'components/StringList'
import InfoSections from 'components/InfoSections'
import TrackGradient from 'screens/TruckScreen/components/TruckGradient'
import Header from 'screens/TruckScreen/components/Header'
import FoodItem from 'screens/AboutTruckScreen/components/FoodItem'
// selectors
import { truckSelector, truckCategoriesSelector, menuItemsSelector } from 'store/trucks/selectors'
// assets
import AddressIcon from 'assets/svg/address.svg'
import PhoneIcon from 'assets/svg/phone.svg'
import TimeIcon from 'assets/svg/time.svg'
// hooks
import useToggleFavoritePress from 'hooks/useToggleFavoritePress'
// utils
import { getImageBySize } from 'services/utils'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// styles
import { TRUCK_IMAGE_HEIGHT } from 'screens/TruckScreen/styles'
import { Metrics, Spacing } from 'styles'
import styles from './styles'

const AboutTruckScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.AboutTruckScreen>> = ({
  navigation,
}) => {
  const { t } = useTranslation()

  const currentTruck = useSelector(truckSelector)

  const truckCategories = useSelector(truckCategoriesSelector)

  const [activeSlide, setActiveSlide] = useState(0)

  const menuItems = useSelector(menuItemsSelector)

  const { toggleFavoritePress } = useToggleFavoritePress()

  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const contacts = useMemo(
    () => [
      { title: t('aboutTrackScreen:address'), items: [{ Icon: AddressIcon, texts: [currentTruck.address] }] },
      { title: t('common:contacts'), items: [{ Icon: PhoneIcon, texts: [currentTruck.phone] }] },
      {
        title: t('aboutTrackScreen:schedule'),
        items: [
          {
            Icon: TimeIcon,
            texts: map(
              currentTruck.scheduleItems,
              (item) => `${item.from} to ${item.to} ${dayjs().day(item.dayOfWeek).format('ddd')}`,
            ),
          },
        ],
      },
    ],
    [t, currentTruck],
  )

  const renderItem = useCallback(
    ({ item }) => (
      <View>
        <Image
          style={{ width: Metrics.windowWidth, height: TRUCK_IMAGE_HEIGHT }}
          source={{ uri: getImageBySize(item, Metrics.truckImgWidth, Metrics.truckImgHeight), cache: 'force-cache' }}
        />
        <TrackGradient />
      </View>
    ),
    [],
  )

  const handleSnapToItem = useCallback((index: number) => setActiveSlide(index), [])

  const foods = useMemo(
    () => (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.foodList}>
        {map(menuItems, (item, index) => (
          <FoodItem
            key={index}
            item={item}
            style={styles.foodItem}
            onPress={() => navigation.navigate(Routes.DishModal, { id: item.id, truckId: currentTruck.id })}
          />
        ))}
      </ScrollView>
    ),
    [currentTruck.id, menuItems, navigation],
  )

  return (
    <View style={styles.screen}>
      <Header translationY={translationY} onFavoritePress={toggleFavoritePress} isFavorite={currentTruck.isFavorite} />
      <Animated.ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View style={styles.truckImage}>
          <Carousel
            autoplay
            loop
            autoplayInterval={5000}
            data={currentTruck.photos}
            inactiveSlideScale={1}
            renderItem={renderItem}
            sliderWidth={Metrics.windowWidth}
            itemWidth={Metrics.windowWidth}
            onSnapToItem={handleSnapToItem}
          />
          <Pagination
            dotsLength={currentTruck.photos.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.carouselPagination}
            dotStyle={styles.carouselDot}
            inactiveDotOpacity={0.3}
            inactiveDotScale={1}
          />
        </View>

        <View style={styles.subTitleWrap}>
          <Typography variant={TypographyVariants.h3} style={styles.subTitle}>
            {currentTruck.name}
          </Typography>
        </View>
        <StringList data={truckCategories} style={{ paddingHorizontal: Spacing.double }} />
        <Typography style={styles.subhead} variant={TypographyVariants.subhead}>
          {t('aboutTrackScreen:subhead')}
        </Typography>

        {foods}

        <InfoSections info={contacts} titleStyle={styles.subhead} infoItemStyle={styles.infoItem} />
      </Animated.ScrollView>
    </View>
  )
}

export default memo(AboutTruckScreen)
