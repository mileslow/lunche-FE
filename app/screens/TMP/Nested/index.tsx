import React, { FC } from 'react'
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native'
// Navigation
import { StackScreenProps } from '@react-navigation/stack'
import { Routes, RootNavigationStackParamsList } from 'navigation'

type TmpNestedScreenProps = StackScreenProps<RootNavigationStackParamsList, Routes.ExampleStackChild>

const TmpNestedScreen: FC<TmpNestedScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nested Screen</Text>
      <Text>{route.params?.payload}</Text>

      <Button
        title='Go back'
        onPress={(): void => {
          navigation.goBack()
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: 16,
  },
})

export default TmpNestedScreen
