import React, { Fragment, useCallback, memo, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import BackButton from 'components/Button/BackButton'
import Button, { ButtonTypes } from 'components/Button'
import Input from 'components/Forms/Input'
import Divider from 'components/Divider'
import CartItem from 'screens/CartScreen/components/CartItem'
// store
import { commentOrderSelector, orderAmountSelector, orderItemsSelector } from 'store/orders/selectors'
import { removeItemFromOrder, changeComment } from 'store/orders/model'
import { AppDispatch } from 'store'
// hooks
import useCountOrderPress from 'hooks/useCountOrderPress'
// assets
import CommentIcon from 'assets/svg/speech-bubble-comment.svg'
// styles
import styles from './styles'

const CartScreen = () => {
  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const orderItems = useSelector(orderItemsSelector)

  const orderAmount = useSelector(orderAmountSelector)

  const comment = useSelector(commentOrderSelector)

  const handleCountPress = useCountOrderPress()

  const handleDeleteDish = useCallback((id: number) => () => dispatch(removeItemFromOrder(id)), [dispatch])

  const handleChangeText = useCallback(
    (text: string) => {
      dispatch(changeComment(text))
    },
    [dispatch],
  )

  const inputIcon = useMemo(
    () => (
      <View style={styles.inputIcon}>
        <CommentIcon />
      </View>
    ),
    [],
  )

  const totals = useMemo<{ label: string; value: string; textVariant?: keyof typeof TypographyVariants }[]>(
    () => [
      { label: t('cartScreen:order'), value: `$ ${orderAmount}` },
      { label: t('cartScreen:fee'), value: '$ 0' },
      { label: t('cartScreen:totalDiscounts'), value: '$ 0' },
      { label: t('cartScreen:total'), value: `$ ${orderAmount}`, textVariant: TypographyVariants.smallBody },
    ],
    [t, orderAmount],
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

  const renderTotals = useMemo(
    () =>
      map(totals, ({ label, value, textVariant = TypographyVariants.smallBody }, index) => (
        <View key={index} style={styles.totalRow}>
          <Typography variant={textVariant}>{label}</Typography>
          <Typography variant={TypographyVariants.smallBody}>{value}</Typography>
        </View>
      )),
    [totals],
  )

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton style={styles.headerIcon} />
        <View style={styles.headerTitle} pointerEvents='none'>
          <Typography variant={TypographyVariants.subhead}>{t('cartScreen:headerTitle')}</Typography>
        </View>
      </View>

      <ScrollView style={styles.scrollStyle}>
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
        {renderTotals}
        <Button type={ButtonTypes.primary} style={styles.button} title={t('cartScreen:primaryBtn')} />
      </View>
    </View>
  )
}

export default memo(CartScreen)
