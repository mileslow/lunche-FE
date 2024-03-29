import React, { FC, Fragment, memo } from 'react'
// libs
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import map from 'lodash.map'
// components
import ScreenContainer from 'components/ScreenContainer'
import Typography, { TypographyVariants } from 'components/Typography'
import ListItem, { IProps as ListItemType } from 'components/ListItem'
// actions
import { clearAuth } from 'store/auth/model'
// types
import { StackScreenProps } from '@react-navigation/stack'
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { AppDispatch } from 'store'
// services
import { clearAllStorage } from 'services/storage'
// assets
import ProfileIcon from 'assets/svg/profile.svg'
import PaymentIcon from 'assets/svg/payment.svg'
import BackIcon from 'assets/svg/back.svg'
import AddressIcon from 'assets/svg/address.svg'
import StarIcon from 'assets/svg/star.svg'
import BookIcon from 'assets/svg/book.svg'
import LogoutIcon from 'assets/svg/logout.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'

const AccountScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.AccountScreen>> = ({ navigation }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = async () => {
    await clearAllStorage()
    dispatch(clearAuth())
  }

  const navigationList: { title?: string; items: ListItemType[] }[] = [
    {
      items: [
        {
          text: t('accountScreen:profileTitle'),
          subtext: t('accountScreen:profileSubtext'),
          leftElement: () => <ProfileIcon width={18} style={styles.iconList} fill={Colors.midNightMoss} />,
          onPress: () => navigation.navigate(Routes.ProfileDetailsScreen),
        },
        {
          text: t('accountScreen:paymentTitle'),
          subtext: t('accountScreen:paymentSubtext'),
          leftElement: () => <PaymentIcon style={styles.iconList} fill={Colors.midNightMoss} />,
          onPress: () => navigation.navigate(Routes.CreditCardsScreen),
        },
        {
          text: t('accountScreen:locationTitle'),
          subtext: t('accountScreen:locationSubtext'),
          leftElement: () => <AddressIcon width={18} style={styles.iconList} fill={Colors.midNightMoss} />,
          onPress: () => navigation.navigate(Routes.LocationsScreen),
        },
      ],
    },
    {
      title: t('accountScreen:sectionMore'),
      items: [
        {
          text: t('accountScreen:rateUsTitle'),
          subtext: t('accountScreen:rateUsSubtext'),
          leftElement: () => <StarIcon style={styles.iconList} />,
          onPress: () => {},
        },
        {
          text: t('accountScreen:FAQTitle'),
          subtext: t('accountScreen:FAQSubtext'),
          leftElement: () => <BookIcon style={styles.iconList} />,
          onPress: () => {},
        },
        {
          text: t('accountScreen:LogoutTitle'),
          leftElement: () => <LogoutIcon style={styles.iconList} />,
          onPress: handleLogout,
        },
      ],
    },
  ]

  return (
    <ScreenContainer>
      <Typography variant={TypographyVariants.h2} style={[styles.title, styles.commonPadding]}>
        {t('accountScreen:headerTitle')}
      </Typography>
      <Typography
        variant={TypographyVariants.body}
        color={Colors.gunsmoke}
        style={[styles.title, styles.commonPadding]}
      >
        {t('accountScreen:subtitle')}
      </Typography>
      <ScrollView>
        {map(navigationList, (section, index) => (
          <Fragment key={index}>
            {!!section.title && (
              <Typography variant={TypographyVariants.subhead} style={[styles.subhead, styles.commonPadding]}>
                {section.title}
              </Typography>
            )}
            {map(section.items, (item, idx) => (
              <ListItem
                key={`${index}-${idx}`}
                withDivider={false}
                rightElement={() => (
                  <BackIcon style={{ transform: [{ rotate: '180deg' }] }} fill={Colors.cadmiumOrange} />
                )}
                style={styles.commonPadding}
                {...item}
              />
            ))}
          </Fragment>
        ))}
      </ScrollView>
    </ScreenContainer>
  )
}

export default memo(AccountScreen)
