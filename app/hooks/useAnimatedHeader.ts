import { useMemo } from 'react'
import { Metrics } from 'styles'
import { TRUCK_IMAGE_HEIGHT } from 'screens/TruckScreen/styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const useAnimatedHeader = () => {
  const insets = useSafeAreaInsets()

  const headerHeight = useMemo(() => Metrics.header + insets.top + 1, [insets])

  const endAnimPosition = useMemo(() => TRUCK_IMAGE_HEIGHT - headerHeight, [headerHeight])

  return { headerHeight, endAnimPosition }
}

export default useAnimatedHeader
