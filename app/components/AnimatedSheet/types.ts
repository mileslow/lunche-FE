import { Ref } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

export interface IAnimatedScrollProps {
  scrollViewRef: Ref<unknown>
  waitFor: Ref<unknown> | Ref<unknown>[]
  simultaneousHandlers: Ref<unknown> | Ref<unknown>[]
  onRegisterScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}
