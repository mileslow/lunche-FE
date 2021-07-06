import React, { memo, useCallback, useEffect, useState } from 'react'
// libs
import { Modal, Pressable, View } from 'react-native'
import Picker from 'react-native-date-picker'
import dayjs from 'dayjs'
// components
import Button, { ButtonTypes } from 'components/Button'
// styles
import styles from './styles'
import { useTranslation } from 'react-i18next'
import Typography from 'components/Typography'
import { Colors } from 'styles'

export interface IDateTimeProps {
  mode?: 'datetime' | 'date' | 'time'
  onSelect: (date: Date) => void
  onRequestClose: () => void
  value?: Date | string
  minimumDate?: Date | string
  maximumDate?: Date | string
  visible: boolean
}

const DateTimePicker = ({
  mode = 'time',
  onSelect,
  value,
  minimumDate,
  maximumDate,
  visible,
  onRequestClose,
}: IDateTimeProps) => {
  const { t } = useTranslation()

  const timeWithClearSeconds = useCallback(
    (time?: string | Date): Date => dayjs(time).second(0).millisecond(0).toDate(),
    [],
  )

  const [date, setDate] = useState<Date>(timeWithClearSeconds)

  useEffect(() => {
    if (visible && !value) {
      setDate(timeWithClearSeconds())
    } else if (value) {
      setDate(timeWithClearSeconds(value))
    }
  }, [value, visible, timeWithClearSeconds])

  const handleSubmit = useCallback(() => {
    onSelect(date)
    onRequestClose()
  }, [onSelect, date, onRequestClose])

  const handleDateChange = useCallback((dateValue) => {
    setDate(dateValue)
  }, [])

  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <View style={styles.modal}>
        <Pressable style={styles.background} onPress={onRequestClose} />
        <View style={styles.pickerPanel}>
          <Picker
            date={date}
            onDateChange={handleDateChange}
            mode={mode}
            minimumDate={minimumDate ? timeWithClearSeconds(minimumDate) : undefined}
            maximumDate={maximumDate ? timeWithClearSeconds(maximumDate) : undefined}
            locale='en'
            is24hourSource='locale'
            textColor={Colors.midNightMoss}
          />
          <View style={styles.actions}>
            <Button onPress={onRequestClose} type={ButtonTypes.basic} style={[styles.button, styles.actionMargin]}>
              <Typography>{t('common:cancel')}</Typography>
            </Button>
            <Button onPress={handleSubmit} type={ButtonTypes.primary} style={styles.button}>
              <Typography color={Colors.basic}>{t('common:select')}</Typography>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default memo(DateTimePicker)
