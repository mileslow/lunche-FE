import React, { useMemo } from 'react'
import round from 'lodash.round'
// assets
import RatingsIcon from 'assets/svg/ratings.svg'
import ClockIcon from 'assets/svg/clock.svg'
import DistanceIcon from 'assets/svg/distance.svg'
// store
import { Truck } from 'store/trucks/types'

const useTruckInfo = (truck: Truck) => {
  return useMemo(
    () => [
      { icon: <RatingsIcon />, text: `${truck.rating}` },
      { icon: <ClockIcon />, text: '25 min' },
      { icon: <DistanceIcon />, text: `${round((truck.distance ?? 0) / 1000, 2)} km` },
    ],
    [truck],
  )
}

export default useTruckInfo
