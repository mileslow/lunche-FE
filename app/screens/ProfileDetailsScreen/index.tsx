import React, { FC, memo, useCallback, useState } from 'react'
// libs
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { StackScreenProps } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
// components
import ScreenContainer from 'components/ScreenContainer'
import Button from 'components/Button'
import Header from 'components/Header'
import Divider from 'components/Divider'
import KeyboardView from 'components/KeyboardView'
import PersonalInfoFields from 'screens/CheckoutScreen/components/PersonalInfoFields'
// store
import { updateCurrentProfile } from 'store/auth/thunks'
import { currentProfileSelector } from 'store/auth/selectors'
// utils
import { schemaValidation } from 'screens/ProfileDetailsScreen/validation'
// types
import { RootNavigationStackParamsList, Routes } from 'navigation'
import { AppDispatch } from 'store'
// styles
import styles from './styles'

const ProfileDetailsScreen: FC<StackScreenProps<RootNavigationStackParamsList, Routes.ProfileDetailsScreen>> = ({
  navigation,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const currentProfile = useSelector(currentProfileSelector)

  const [isLoading, setState] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      client: {
        email: currentProfile?.email,
        phone: currentProfile?.phone,
        name: currentProfile?.name,
      },
    },
    resolver: yupResolver(schemaValidation),
  })

  const onSubmit = useCallback(
    async (data) => {
      if (currentProfile?.id) {
        setState(true)
        await dispatch(updateCurrentProfile({ id: currentProfile?.id, data: { ...data.client } }))
        setState(false)
        if (currentProfile.phone !== data.client.phone) {
          navigation.setParams({ successVerify: false })
          navigation.navigate(Routes.VerifyCodeScreen, {
            phoneNumber: data.client.phone,
            prevScreen: Routes.ProfileDetailsScreen,
            verifyThunk: 'updateProfileVerify',
            userId: currentProfile.id,
          })
        }
      }
    },
    [navigation, dispatch, currentProfile],
  )

  return (
    <ScreenContainer isLoading={isLoading}>
      <Header withBack title={t('profileDetailsScreen:headerTitle')} />
      <KeyboardView>
        <View style={styles.form}>
          <PersonalInfoFields control={control} errors={errors} />
        </View>
        <Divider />
        <Button
          style={styles.saveButton}
          title={t('profileDetailsScreen:saveButton')}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardView>
    </ScreenContainer>
  )
}

export default memo(ProfileDetailsScreen)
