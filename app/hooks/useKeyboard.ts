import { useEffect, useState, useCallback } from 'react'
import { Keyboard } from 'react-native'

const useKeyboard = () => {
  const [isShowKeyboard, setKeyboard] = useState<boolean>(false)

  const keyboardShow = useCallback((isShow: boolean) => () => setKeyboard(isShow), [setKeyboard])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardShow(true))
    Keyboard.addListener('keyboardDidHide', keyboardShow(false))
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardShow(true))
      Keyboard.removeListener('keyboardDidHide', keyboardShow(false))
    }
  }, [keyboardShow])

  return isShowKeyboard
}

export default useKeyboard
