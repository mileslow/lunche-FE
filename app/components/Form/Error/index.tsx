import React, { FC, memo } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors, FontSize, Spacing } from 'styles'

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: Spacing.tiny,
    minHeight: 14,
  },
  error: {
    fontSize: FontSize.base,
  },
})

const Error: FC<{ error: string | undefined }> = ({ error }) => (
  <View style={styles.errorContainer}>
    {!!error && <Text style={[styles.error, { color: Colors.pigmentRed }]}>{error}</Text>}
  </View>
)

export default memo(Error)
