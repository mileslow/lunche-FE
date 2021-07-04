import React, { useCallback, memo, useEffect, useState, FC } from 'react'
// libs
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash.upperfirst'
// components
import ScreenContainer from 'components/ScreenContainer'
import Header from 'components/Header'
import AddButton from 'components/Button/AddButton'
import ListItem from 'components/ListItem'
import Button, { ButtonTypes } from 'components/Button'
// store
import { cardsSelector } from 'store/payments/selectors'
import { deleteCreditCard, getCreditCards } from 'store/payments/thunks'
// types
import { StackScreenProps } from '@react-navigation/stack'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { AppDispatch } from 'store'
import { CreditCard } from 'store/payments/types'
// hooks
import useCreditCardIcon from 'hooks/useCreditCardIcon'
// assets
import TrashIcon from 'assets/svg/trash.svg'
// styles
import { Colors, Spacing } from 'styles'
import styles from 'screens/LocationsScreen/styles'

const CreditCardsScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.CreditCardsScreen>> = ({
  navigation,
}) => {
  const { t } = useTranslation()

  const [isLoading, setLoading] = useState<boolean>(false)

  const cards = useSelector(cardsSelector)

  const dispatch = useDispatch<AppDispatch>()

  const cardIcons = useCreditCardIcon({ style: { marginRight: Spacing.double } })

  useEffect(() => {
    const fetchCards = async () => {
      if (!cards.length) {
        setLoading(true)
        await dispatch(getCreditCards())
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  const handleDeleteCard = useCallback(
    async (id: number) => {
      setLoading(true)
      await dispatch(deleteCreditCard(id))
      setLoading(false)
    },
    [dispatch, setLoading],
  )

  const openAddCardModal = useCallback(() => {
    navigation.navigate(Routes.CardModal)
  }, [navigation])

  const renderItem = useCallback(
    ({ item }: { item: CreditCard }) => (
      <ListItem
        pointerEvents='box-none'
        withDivider={false}
        text={upperFirst(item.brand)}
        subtext={`**** ${item.lastFourNumbers}`}
        leftElement={() => cardIcons[item.brand]}
        rightElement={() => (
          <Button type={ButtonTypes.link} onPress={() => handleDeleteCard(item.id)} style={styles.deleteBtn}>
            <TrashIcon />
          </Button>
        )}
      />
    ),
    [handleDeleteCard, cardIcons],
  )

  const keyExtractor = useCallback((item) => item.id, [])

  return (
    <ScreenContainer isLoading={isLoading}>
      <Header withBack title={t('creditCardsScreen:headerTitle')} />
      <FlatList
        style={styles.listPadding}
        data={cards}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={
          <AddButton
            style={styles.addButton}
            text={t('creditCardsScreen:addCard')}
            color={Colors.cadmiumOrange}
            onPress={openAddCardModal}
          />
        }
      />
    </ScreenContainer>
  )
}

export default memo(CreditCardsScreen)
