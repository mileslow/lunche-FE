import React, { useCallback, useMemo, useReducer, memo, FC } from 'react'
// libs
import { View, SectionList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import groupBy from 'lodash.groupby'
import map from 'lodash.map'
// components
import Header from 'components/Header'
import Spinner from 'components/Spinner'
import ItemWithPrice from 'components/ItemWithPrice'
import Typography, { TypographyVariants } from 'components/Typography'
// thunks
import { getOrders } from 'store/orders/thunks'
import { Order, OrderStatus } from 'store/orders/types'
import { AppDispatch } from 'store'
// styles
import styles from './styles'
import { Colors } from 'styles'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { StackScreenProps } from '@react-navigation/stack'

type State = {
  isLoading: boolean
  orders: Order[]
}
const OrdersScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.OrdersScreen>> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const [state, setState] = useReducer((store: State, newStore: Partial<State>) => ({ ...store, ...newStore }), {
    isLoading: false,
    orders: [],
  })

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        setState({ isLoading: true })
        const result = await dispatch(getOrders())
        if (getOrders.fulfilled.match(result)) {
          setState({ isLoading: false, orders: result.payload })
          return
        }
        setState({ isLoading: false })
      }
      fetchOrders()
    }, []),
  )

  const redirectToOrder = useCallback(
    (orderId: number) => {
      navigation.navigate(Routes.OrderTrackerScreen, { orderId })
    },
    [navigation],
  )

  const renderItem = useCallback(
    ({ item }: { item: Order }) => (
      <ItemWithPrice
        imageSize={110}
        downloadImgSize={200}
        descTextVariant={TypographyVariants.body}
        priceTextVariant={TypographyVariants.body}
        nameTextVariant={TypographyVariants.cardTitle}
        descStyle={styles.descStyle}
        item={{
          id: item.id,
          name: item.foodTruck.name,
          photo: item.foodTruck.mainPhoto,
          price: item.totalSum,
          description: map(item.orderItems, (order) => `${order.itemCount}x ${order.menuItem.name}`).join(', '),
        }}
        onPress={() => redirectToOrder(item.id)}
        renderBottomRightBlock={() => (
          <Typography variant={TypographyVariants.smallBody} color={Colors.primary}>
            {item.status === OrderStatus.READY ? t('ordersScreen:reorder') : t('ordersScreen:orderTracker')}
          </Typography>
        )}
      />
    ),
    [redirectToOrder, t],
  )

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <Typography variant={TypographyVariants.subhead} style={styles.sectionTitle}>
        {section.title}
      </Typography>
    ),
    [],
  )

  const sections = useMemo(() => {
    return map(groupBy(state.orders, 'status'), (data, title) => ({ title, data }))
  }, [state.orders])

  const keyExtractor = useCallback((item, index) => index, [])

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack title={t('ordersScreen:headerTitle')} />
      <SectionList
        stickySectionHeadersEnabled={false}
        keyExtractor={keyExtractor}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        renderItem={renderItem}
      />
      {state.isLoading && <Spinner />}
    </View>
  )
}

export default memo(OrdersScreen)
