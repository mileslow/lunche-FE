import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StatusBar, StatusBarStyle } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const setBarStyle = (style: StatusBarStyle) => StatusBar.setBarStyle(style)

const useStatusBarStyle = (contentStyle: StatusBarStyle) => {
  const statusBarStyle = useSharedValue(contentStyle)

  useFocusEffect(
    useCallback(() => {
      statusBarStyle.value = contentStyle
      setBarStyle(contentStyle)
    }, [statusBarStyle, contentStyle]),
  )

  return statusBarStyle
}

export default useStatusBarStyle
