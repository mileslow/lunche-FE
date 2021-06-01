import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  timePicker: {
    backgroundColor: Colors.alabaster,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: Spacing.large,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
  },
  timePickerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.base,
  },
  timeCheckbox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    marginHorizontal: Spacing.base,
  },
  chooseTimeText: {
    marginRight: Spacing.tiny,
  },
})
