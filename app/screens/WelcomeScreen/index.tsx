import React, { useCallback, useMemo, useState, memo } from 'react'
// libs
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Button, { ButtonTypes } from 'components/Button'
// store
import { setShowWelcome } from 'store/general/model'
import { AppDispatch } from 'store'
// services
import { setSkipWelcome } from 'services/storage'
// assets
import IllustrationGreenImage from 'assets/svg/illustration_green.svg'
import IllustrationImage from 'assets/svg/illustration.svg'
// styles
import { Colors, Metrics, Spacing } from 'styles'
import styles, { IMAGE_SIZE } from './styles'

const WelcomeScreen = () => {
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const dispatch = useDispatch<AppDispatch>()

  const [activeSlide, setActiveSlide] = useState(0)

  const SLIDES = useMemo(
    () => [
      {
        Image: IllustrationGreenImage,
        title: t('welcomeScreen:title1'),
        desc: t('welcomeScreen:desc1'),
      },
      {
        Image: IllustrationImage,
        title: t('welcomeScreen:title2'),
        desc: t('welcomeScreen:desc2'),
      },
      {
        Image: IllustrationGreenImage,
        title: t('welcomeScreen:title3'),
        desc: t('welcomeScreen:desc3'),
      },
    ],
    [t],
  )

  const renderItem = useCallback(
    ({ item: { Image, title, desc } }) => (
      <View style={styles.slide}>
        <View style={styles.imageWrap}>
          <Image width={IMAGE_SIZE} height={IMAGE_SIZE} style={styles.image} />
        </View>
        <View style={styles.textWrap}>
          <Typography variant={TypographyVariants.headline} style={styles.title}>
            {title}
          </Typography>
          <Typography variant={TypographyVariants.body} color={Colors.gunsmoke} style={styles.desc}>
            {desc}
          </Typography>
        </View>
      </View>
    ),
    [],
  )

  const handleSnapToItem = useCallback((index: number) => setActiveSlide(index), [])

  const handleOrderButton = useCallback(async () => {
    await setSkipWelcome(true)
    dispatch(setShowWelcome(false))
  }, [dispatch])

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + Spacing.double }]}>
      <Carousel
        autoplay
        loop
        autoplayInterval={5000}
        data={SLIDES}
        inactiveSlideScale={1}
        renderItem={renderItem}
        sliderWidth={Metrics.windowWidth}
        itemWidth={Metrics.windowWidth}
        onSnapToItem={handleSnapToItem}
      />
      <Pagination
        dotsLength={SLIDES.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.carouselDot}
        dotColor={Colors.cadmiumOrange}
        inactiveDotColor={Colors.gunsmoke}
        inactiveDotScale={1}
      />
      <Button
        type={ButtonTypes.primary}
        title={t('welcomeScreen:orderButton')}
        style={styles.button}
        onPress={handleOrderButton}
      />
    </View>
  )
}

export default memo(WelcomeScreen)
