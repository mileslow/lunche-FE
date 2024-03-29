import { StackCardStyleInterpolator } from '@react-navigation/stack/src/types'

export const modalCardStyleInterpolator: StackCardStyleInterpolator = ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress.interpolate({ inputRange: [0, 0.5, 0.9, 1], outputRange: [0, 0.25, 0.7, 1] }),
  },
  overlayStyle: {
    opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5], extrapolate: 'clamp' }),
  },
})
