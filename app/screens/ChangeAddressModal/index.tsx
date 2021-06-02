import React, { FC, useCallback, useState, memo, useMemo, useEffect, useRef } from 'react'
import { View, SectionList, Keyboard, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import debounce from 'lodash.debounce'
import find from 'lodash.find'
import map from 'lodash.map'
import reject from 'lodash.reject'
// components
import Input from 'components/Form/Input'
import Typography, { TypographyVariants } from 'components/Typography'
import Button from 'components/Button'
import Header from 'components/Header'
import LocationSearchItem from 'screens/ChangeAddressModal/components/LocationSearchItem'
// selector
import { currentCountrySelector } from 'store/general/selectors'
// api
import api from 'services/api'
import { LocationType } from 'services/api/endpoints/mapBox'
// store
import { setCurrentPosition } from 'store/general/model'
import { AppDispatch } from 'store'
// services
import { getRecentSearch, setRecentSearch } from 'services/storage'
import { CurrentLocation } from 'services/geoLocation'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
// assets
import CloseIcon from 'assets/svg/close.svg'
import AddressIcon from 'assets/svg/address.svg'
import NavigationIcon from 'assets/svg/navigation.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'
import { ButtonTypes } from 'components/Button'

const createLocationObject = (location: LocationType): CurrentLocation => ({
  id: location.id,
  address: location.text,
  lng: location.geometry.coordinates[0],
  lat: location.geometry.coordinates[1],
  country: find(location.context, (i) => i.id.includes('country'))?.short_code,
  district: find(location.context, (i) => i.id.includes('district'))?.text,
})

const ChangeAddressModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.ChangeAddressModal>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const country = useSelector(currentCountrySelector)

  const [searchResult, setSearchResult] = useState<CurrentLocation[]>([])

  const [searchText, setSearchText] = useState<string>('')

  const [recent, setRecent] = useState<CurrentLocation[]>([])

  useEffect(() => {
    const fetchRecentSearch = async () => {
      const result = await getRecentSearch()
      setRecent(result)
    }
    fetchRecentSearch()
  }, [])

  const fetchTrucks = useCallback(
    async (search: string) => {
      if (search.length > 2) {
        const result = await api.search(search)
        setSearchResult(map(result.data.features, (loc) => createLocationObject(loc)))
      } else {
        setSearchResult([])
      }
    },
    [setSearchResult, country],
  )

  const debouncedFetchTrucks = useRef(debounce(fetchTrucks, 300)).current

  useEffect(() => {
    debouncedFetchTrucks(searchText)
  }, [debouncedFetchTrucks, searchText])

  const handleLocationPress = useCallback(
    (item: CurrentLocation) => {
      Keyboard.dismiss()
      dispatch(setCurrentPosition(item))
      const filteredLocations = reject(recent, { id: item.id })
      setRecentSearch(
        filteredLocations.length > 4
          ? [item, ...filteredLocations.slice(0, filteredLocations.length - 1)]
          : [item, ...filteredLocations],
      )
      navigation.goBack()
    },
    [navigation, dispatch, recent],
  )

  const keyExtractor = useCallback((item) => item.id, [])

  const renderItem = useCallback(
    ({ item }) => <LocationSearchItem item={item} Icon={NavigationIcon} onPress={() => handleLocationPress(item)} />,
    [handleLocationPress],
  )

  const renderTitleSection = useCallback(
    ({ section: { title, data } }) =>
      title && data.length ? (
        <Typography variant={TypographyVariants.body} color={Colors.gunsmoke} style={styles.subTitle}>
          {title}
        </Typography>
      ) : null,
    [],
  )

  const renderRightIcon = useMemo(
    () => (
      <Pressable onPress={() => setSearchText('')}>
        <CloseIcon />
      </Pressable>
    ),
    [],
  )

  const sections = useMemo(
    () => [
      { title: '', data: searchResult },
      { title: t('changeAddressModal:savedLocations'), data: [] },
      { title: t('changeAddressModal:recentLocations'), data: recent },
    ],
    [searchResult, t, recent],
  )

  const closeModalIcon = useCallback(
    () => (
      <Button type={ButtonTypes.icon} onPress={() => navigation.goBack()}>
        <CloseIcon width={28} height={28} />
      </Button>
    ),
    [navigation],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header left={closeModalIcon} />
      <Typography variant={TypographyVariants.h3} style={[styles.commonText, styles.title]}>
        {t('changeAddressModal:title')}
      </Typography>
      <Typography
        variant={TypographyVariants.body}
        color={Colors.gunsmoke}
        style={[styles.commonText, styles.description]}
      >
        {t('changeAddressModal:description')}
      </Typography>
      <Input
        containerStyle={styles.input}
        leftIcon={<AddressIcon fill={Colors.gunsmoke} />}
        rightIcon={renderRightIcon}
        onChangeText={setSearchText}
        value={searchText}
        withError={false}
      />
      <SectionList
        keyboardShouldPersistTaps='always'
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        sections={sections}
        renderSectionHeader={renderTitleSection}
        onScrollBeginDrag={Keyboard.dismiss}
      />
    </View>
  )
}

export default memo(ChangeAddressModal)
