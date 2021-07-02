import React, { FC, memo, useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
// components
import ScreenContainer from 'components/ScreenContainer'
import Header from 'components/Header'
import ListItem from 'components/ListItem'
import AddButton from 'components/Button/AddButton'
import Button, { ButtonTypes } from 'components/Button'
// store
import { addLocation, deleteLocation } from 'store/auth/thunks'
import { savedLocationsSelector, currentUserIdSelector } from 'store/auth/selectors'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { LocationSectionsKeys } from 'screens/ChangeAddressModal'
import { AppDispatch } from 'store'
// assets
import AddressIcon from 'assets/svg/address.svg'
import TrashIcon from 'assets/svg/trash.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'

const LocationsScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.LocationsScreen>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const currentUserId = useSelector(currentUserIdSelector)

  const savedLocations = useSelector(savedLocationsSelector)

  const [isLoading, setLoading] = useState<boolean>(false)

  useFocusEffect(
    useCallback(() => {
      const saveLocation = async () => {
        const { address, lat, lng } = route.params ?? {}
        if (currentUserId && address && lat && lng) {
          setLoading(true)
          navigation.setParams({ address: undefined, lat: undefined, lng: undefined })
          await dispatch(addLocation({ id: currentUserId, data: { address, latitude: lat, longitude: lng } }))
          setLoading(false)
        }
      }
      saveLocation()
    }, [dispatch, currentUserId, navigation, route.params]),
  )

  const openLocationModal = useCallback(() => {
    navigation.navigate(Routes.ChangeAddressModal, {
      prevScreen: Routes.LocationsScreen,
      hideSections: [LocationSectionsKeys.SavedLocations],
    })
  }, [navigation])

  const handleDeleteLocation = useCallback(
    async (id) => {
      if (currentUserId) {
        setLoading(true)
        await dispatch(deleteLocation({ userId: currentUserId, id }))
        setLoading(false)
      }
    },
    [dispatch, currentUserId],
  )

  const renderItem = useCallback(
    ({ item }) => (
      <ListItem
        pointerEvents='box-none'
        withDivider={false}
        onPress={() => null}
        text={item.address}
        leftElement={() => <AddressIcon fill={Colors.midNightMoss} style={styles.addressIcon} />}
        rightElement={() => (
          <Button type={ButtonTypes.link} onPress={() => handleDeleteLocation(item.id)} style={styles.deleteBtn}>
            <TrashIcon />
          </Button>
        )}
      />
    ),
    [handleDeleteLocation],
  )

  const keyExtractor = useCallback((item) => item.id, [])

  return (
    <ScreenContainer isLoading={isLoading}>
      <Header withBack title={t('locationsScreen:headerTitle')} />
      <FlatList
        style={styles.listPadding}
        data={savedLocations}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={
          <AddButton
            style={styles.addButton}
            text={t('locationsScreen:addLocation')}
            color={Colors.cadmiumOrange}
            onPress={openLocationModal}
          />
        }
      />
    </ScreenContainer>
  )
}

export default memo(LocationsScreen)
