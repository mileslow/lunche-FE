import React, { Fragment, useCallback, useMemo, useState } from 'react'
// libs
import { View, Image, ScrollView, useWindowDimensions } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useTranslation } from 'react-i18next'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import StringList from 'components/StringList'
import InfoWithIconList from 'components/InfoWithIconList'
import TrackGradient from 'screens/TruckScreen/components/TruckGradient'
import Header from 'screens/TruckScreen/components/Header'
import FoodItem from 'screens/AboutTruckScreen/components/FoodItem'
import ContactItem from 'screens/AboutTruckScreen/components/ContactItem'
// assets
import RatingsIcon from 'assets/svg/ratings.svg'
import AddressIcon from 'assets/svg/address.svg'
import PhoneIcon from 'assets/svg/phone.svg'
// styles
import { TRUCK_IMAGE_HEIGHT } from 'screens/TruckScreen/styles'
import { Spacing } from 'styles'
import styles from './styles'

const FOODS = [
  { title: 'Cookie Sandwich', categories: ['Lunch', 'Chinese'], image: require('../TruckScreen/food.png') },
  { title: 'Cookie Sandwich', categories: ['Lunch', 'Chinese'], image: require('../TruckScreen/food.png') },
  { title: 'Cookie Sandwich', categories: ['Lunch', 'Chinese'], image: require('../TruckScreen/food.png') },
  { title: 'Cookie Sandwich', categories: ['Lunch', 'Chinese'], image: require('../TruckScreen/food.png') },
  { title: 'Cookie Sandwich', categories: ['Lunch', 'Chinese'], image: require('../TruckScreen/food.png') },
  { title: 'Cookie Sandwich', categories: ['Lunch', 'Chinese'], image: require('../TruckScreen/food.png') },
  { title: 'Cookie Sandwich', categories: ['Lunch', 'Chinese'], image: require('../TruckScreen/food.png') },
]

const AboutTruckScreen = () => {
  const { t } = useTranslation()

  const WINDOW_WIDTH = useWindowDimensions().width

  const [activeSlide, setActiveSlide] = useState(0)

  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const renderItem = useCallback(
    () => (
      <View>
        <Image style={{ width: WINDOW_WIDTH, height: TRUCK_IMAGE_HEIGHT }} source={require('./Header-image.jpeg')} />
        <TrackGradient />
      </View>
    ),
    [WINDOW_WIDTH],
  )

  const handleSnapToItem = useCallback((index: number) => setActiveSlide(index), [])

  const foods = useMemo(
    () => map(FOODS, (item, index) => <FoodItem key={index} item={item} style={styles.foodItem} />),
    [],
  )

  const contacts = useMemo(
    () =>
      map(
        [
          { title: t('aboutTrackScreen:address'), item: { icon: AddressIcon, text: '3517 W. Gray St. Utica' } },
          { title: t('aboutTrackScreen:contacts'), item: { icon: PhoneIcon, text: '(907) 555-0101' } },
        ],
        (contact, index) => (
          <Fragment key={index}>
            <Typography style={styles.subhead} variant={TypographyVariants.subhead}>
              {contact.title}
            </Typography>
            <ContactItem item={contact.item} />
          </Fragment>
        ),
      ),
    [t],
  )

  return (
    <View style={styles.screen}>
      <Header translationY={translationY} />

      <Animated.ScrollView style={styles.screen} onScroll={scrollHandler} scrollEventThrottle={16}>
        <View style={styles.truckImage}>
          <Carousel
            data={[1, 2, 3, 4]}
            inactiveSlideScale={1}
            renderItem={renderItem}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={WINDOW_WIDTH}
            onSnapToItem={handleSnapToItem}
          />
          <Pagination
            dotsLength={[1, 2, 3, 4].length}
            activeDotIndex={activeSlide}
            containerStyle={styles.carouselPagination}
            dotStyle={styles.carouselDot}
            inactiveDotOpacity={0.3}
            inactiveDotScale={1}
          />
        </View>

        <View style={styles.subTitleWrap}>
          <Typography variant={TypographyVariants.h3} style={styles.subTitle}>
            Dined
          </Typography>
          <InfoWithIconList data={[{ icon: <RatingsIcon />, text: '4.3 (200+ ratings)' }]} />
        </View>
        <StringList data={['Chinese', 'American', 'Deshi food']} style={{ paddingHorizontal: Spacing.double }} />
        <Typography style={styles.subhead} variant={TypographyVariants.subhead}>
          {t('aboutTrackScreen:subhead')}
        </Typography>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.foodList}>
          {foods}
        </ScrollView>
        {contacts}
      </Animated.ScrollView>
    </View>
  )
}

export default AboutTruckScreen
