import React, { FC, memo, useCallback, useState } from 'react'
// libs
import { View } from 'react-native'
import { Control, Controller, FieldName, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// components
import Button, { ButtonTypes } from 'components/Button'
import Checkbox from 'components/Checkbox'
import Typography, { TypographyVariants } from 'components/Typography'
// types
import DateTimePicker from 'components/DateTimePicker'
// assets
import RoundedCalendarIcon from 'assets/svg/rounded-wall-calendar.svg'
// styles
import { Colors } from 'styles'
import styles from './styles'
import dayjs from 'dayjs'

type IProps = {
  control: Control<any>
  name: FieldName<FieldValues>
  defaultValue?: string
  shouldUnregister?: boolean
}

const TimeField: FC<IProps> = ({ control, defaultValue, name, shouldUnregister }) => {
  const { t } = useTranslation()

  const [isShowTimePicker, setShowTimePicker] = useState(false)

  const handleShowTimePicker = useCallback((value) => () => setShowTimePicker(value), [])

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <View style={styles.timePicker}>
          <View style={styles.timePickerRow}>
            <Button
              type={ButtonTypes.link}
              style={styles.timeCheckbox}
              pointerEvents='box-only'
              onPress={() => onChange(undefined)}
            >
              <Checkbox type='radio' style={styles.checkbox} checked={!value} />
              <Typography variant={TypographyVariants.body}>{t('checkoutScreen:asap')}</Typography>
            </Button>
            <Typography variant={TypographyVariants.caption}>40-50 min</Typography>
          </View>
          <View style={styles.timePickerRow}>
            <Button
              type={ButtonTypes.link}
              style={styles.timeCheckbox}
              pointerEvents='box-only'
              onPress={handleShowTimePicker(true)}
            >
              <Checkbox type='radio' style={styles.checkbox} checked={value} />
              <Typography variant={TypographyVariants.body}>{t('checkoutScreen:scheduled')}</Typography>
            </Button>

            <Button style={styles.timeCheckbox} type={ButtonTypes.link} onPress={handleShowTimePicker(true)}>
              <Typography variant={TypographyVariants.caption} color={Colors.primary} style={styles.chooseTimeText}>
                {value ? dayjs(value).format('HH:mm') : t('checkoutScreen:chooseTime')}
              </Typography>
              <RoundedCalendarIcon />
            </Button>
          </View>
          {isShowTimePicker && (
            <DateTimePicker
              visible={isShowTimePicker}
              onRequestClose={handleShowTimePicker(false)}
              minimumDate={dayjs().toDate()}
              onSelect={(date) => onChange(date.toISOString())}
            />
          )}
        </View>
      )}
    />
  )
}

export default memo(TimeField)
