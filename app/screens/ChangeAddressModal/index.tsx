import React, { FC, useCallback, useState, memo, useMemo, useEffect, useRef } from 'react'
import { SectionList, Keyboard, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import debounce from 'lodash.debounce'
import find from 'lodash.find'
import map from 'lodash.map'
import reject from 'lodash.reject'
import includes from 'lodash.includes'
// components
import Input from 'components/Form/Input'
import Typography, { TypographyVariants } from 'components/Typography'
import Button from 'components/Button'
import Header from 'components/Header'
import ListItem from 'components/ListItem'
import ScreenContainer from 'components/ScreenContainer'
import { ButtonTypes } from 'components/Button'
// selector
import { savedLocationsSelector } from 'store/auth/selectors'
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

const createLocationObject = (location: LocationType): CurrentLocation => ({
  id: location.id,
  combinedAddress: `${location.address ? `${location.address} ` : ''}${location.text}`,
  address: location.text,
  placeName: location.place_name,
  lng: location.geometry.coordinates[0],
  lat: location.geometry.coordinates[1],
  country: find(location.context, (i) => i.id.includes('country'))?.short_code,
  place: find(location.context, (i) => i.id.includes('place'))?.text,
})

export enum LocationSectionsKeys {
  SearchLocations = '0',
  SavedLocations = '1',
  ResentLocations = '2',
}

const ChangeAddressModal: FC<StackScreenProps<RootNavigationStackParamsList, Routes.ChangeAddressModal>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const savedLocations = useSelector(savedLocationsSelector)

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
    [setSearchResult],
  )

  const debouncedFetchTrucks = useRef(debounce(fetchTrucks, 700)).current

  useEffect(() => {
    debouncedFetchTrucks(searchText)
  }, [debouncedFetchTrucks, searchText])

  const handleLocationPress = useCallback(
    (item: CurrentLocation) => {
      Keyboard.dismiss()
      const filteredLocations = reject(recent, { id: item.id })
      setRecentSearch(
        filteredLocations.length > 4
          ? [item, ...filteredLocations.slice(0, filteredLocations.length - 1)]
          : [item, ...filteredLocations],
      )

      if (route.params?.prevScreen) {
        navigation.navigate(route.params?.prevScreen, {
          address: item.placeName || item.address,
          lat: item.lat,
          lng: item.lng,
        })
      } else {
        dispatch(setCurrentPosition(item))
        navigation.goBack()
      }
    },
    [navigation, dispatch, recent, route],
  )

  const keyExtractor = useCallback((item) => item.id, [])

  const renderItem = useCallback(
    ({ item }) => (
      <ListItem
        style={styles.searchItem}
        text={item.combinedAddress || item.address}
        subtext={item.place}
        leftElement={() => <NavigationIcon style={styles.icon} />}
        onPress={() => handleLocationPress(item)}
      />
    ),
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

  const renderRightIcon = useCallback(
    () => (
      <Pressable onPress={() => setSearchText('')}>
        <CloseIcon />
      </Pressable>
    ),
    [],
  )

  const sections = useMemo(() => {
    const data = [
      { key: LocationSectionsKeys.SearchLocations, title: '', data: searchResult },
      {
        key: LocationSectionsKeys.SavedLocations,
        title: t('changeAddressModal:savedLocations'),
        data: map(savedLocations, (i) => ({ combinedAddress: i.address, lat: i.latitude, lng: i.longitude })),
      },
      { key: LocationSectionsKeys.ResentLocations, title: t('changeAddressModal:recentLocations'), data: recent },
    ]

    if (route.params?.hideSections?.length) {
      return reject(data, (i) => includes(route.params?.hideSections, i.key))
    }
    return data
  }, [route.params, searchResult, t, recent, savedLocations])

  const closeModalIcon = useCallback(
    () => (
      <Button type={ButtonTypes.icon} onPress={() => navigation.goBack()}>
        <CloseIcon width={28} height={28} />
      </Button>
    ),
    [navigation],
  )

  const addressIcon = useCallback(() => <AddressIcon fill={Colors.gunsmoke} />, [])

  return (
    <ScreenContainer>
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
        leftIcon={addressIcon}
        rightIcon={renderRightIcon}
        onChangeText={setSearchText}
        value={searchText}
        withError={false}
      />
      <SectionList
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps='always'
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        sections={sections}
        renderSectionHeader={renderTitleSection}
        onScrollBeginDrag={Keyboard.dismiss}
      />
    </ScreenContainer>
  )
}

export default memo(ChangeAddressModal)
