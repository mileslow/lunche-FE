import { StyleSheet } from 'react-native'
import { Colors, Spacing } from 'styles'

export default StyleSheet.create({
  modal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.double,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.midNightMoss,
    opacity: 0.7,
  },
  pickerPanel: {
    alignItems: 'center',
    backgroundColor: Colors.basic,
    borderRadius: 16,
    padding: Spacing.double,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  actionMargin: {
    marginRight: Spacing.small,
  },
  panel: {
    backgroundColor: Colors.basic,
    borderRadius: 16,
  },
  button: {
    borderRadius: 4,
    height: 36,
    paddingHorizontal: 8,
  },
})
