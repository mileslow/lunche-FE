import React, { FC, Fragment, useCallback, memo, useMemo } from 'react'
import { ScrollView, View, Keyboard } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash.map'
// components
import { TypographyVariants } from 'components/Typography'
import Button, { ButtonTypes } from 'components/Button'
import Header from 'components/Header'
import Input from 'components/Form/Input'
import Divider from 'components/Divider'
import Totals from 'components/Totals'
import CartItem from 'screens/CartScreen/components/CartItem'
// store
import { commentOrderSelector, orderAmountSelector, orderItemsSelector } from 'store/orders/selectors'
import { truckTaxSelector } from 'store/trucks/selectors'
import { removeItemFromOrder, changeComment } from 'store/orders/model'
import { AppDispatch } from 'store'
// hooks
import useCountOrderPress from 'hooks/useCountOrderPress'
import useStatusBarStyle from 'hooks/useStatusBarStyle'
// assets
import CommentIcon from 'assets/svg/speech-bubble-comment.svg'
// styles
import styles from './styles'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { StackScreenProps } from '@react-navigation/stack'

const CartScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.CartScreen>> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const orderItems = useSelector(orderItemsSelector)

  const orderAmount = useSelector(orderAmountSelector)

  const comment = useSelector(commentOrderSelector)

  const truckTax = useSelector(truckTaxSelector)

  const handleCountPress = useCountOrderPress()

  useStatusBarStyle('dark-content')

  const handleDeleteDish = useCallback((id: number) => dispatch(removeItemFromOrder(id)), [dispatch])

  const handleChangeText = useCallback(
    (text: string) => {
      dispatch(changeComment(text))
    },
    [dispatch],
  )

  const redirectToCheckout = useCallback(() => {
    navigation.navigate(Routes.CheckoutScreen)
  }, [navigation])

  const inputIcon = useCallback(
    () => (
      <View style={styles.inputIcon}>
        <CommentIcon />
      </View>
    ),
    [],
  )

  const totals = useMemo(
    () => [
      { label: t('totals:order'), value: `$ ${orderAmount}` },
      { label: t('totals:fee'), value: `$ ${truckTax}` },
      { label: t('totals:total'), value: `$ ${orderAmount + truckTax}`, textVariant: TypographyVariants.body },
    ],
    [t, orderAmount, truckTax],
  )

  const renderItems = useMemo(
    () =>
      map(orderItems, (dish, index) => (
        <Fragment key={index}>
          <Divider style={styles.divider} />
          <CartItem
            name={dish.name}
            itemCount={dish.itemCount}
            price={dish.price}
            handleDeleteDish={() => handleDeleteDish(dish.menuItemId)}
            onPressPlus={() => handleCountPress(dish)(1)}
            onPressMinus={() => handleCountPress(dish)(-1)}
          />
        </Fragment>
      )),
    [orderItems, handleCountPress, handleDeleteDish],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Header withBack title={t('cartScreen:headerTitle')} />

      <ScrollView keyboardShouldPersistTaps='always' style={styles.scrollStyle} onScrollBeginDrag={Keyboard.dismiss}>
        <Input
          containerStyle={styles.input}
          leftIcon={inputIcon}
          placeholder={t('cartScreen:commentPlaceholder')}
          onChangeText={handleChangeText}
          value={comment}
        />
        {renderItems}
      </ScrollView>
      <Divider />

      <View style={styles.totals}>
        <Totals totals={totals} style={styles.totalRow} />
        <Button
          disabled={!Object.keys(orderItems).length}
          type={ButtonTypes.primary}
          style={styles.button}
          title={t('cartScreen:primaryBtn')}
          onPress={redirectToCheckout}
        />
      </View>
    </View>
  )
}

export default memo(CartScreen)
