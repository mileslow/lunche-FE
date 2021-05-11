import React, { FC, useMemo } from 'react'
import { Pressable, Image, Text } from 'react-native'
// components
import StringList from 'components/StringList'
// assets
import ClockIcon from 'assets/svg/clock.svg'
import DistanceIcon from 'assets/svg/distance.svg'
import RatingsIcon from 'assets/svg/ratings.svg'
import truckImage from './BG.png'
// styles
import styles from './styles'
import InfoWithIconList from 'components/InfoWithIconList'

const CATEGORIES = ['Chinese', 'American', 'Deshi food']

interface IProps {
  onPress: () => void
}

const TrackCard: FC<IProps> = ({ onPress }) => {
  const info = useMemo(
    () => [
      { icon: <RatingsIcon />, text: '4.3 (200+ ratings)' },
      { icon: <ClockIcon />, text: '25 min' },
      { icon: <DistanceIcon />, text: '2 km' },
    ],
    [],
  )

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image style={styles.mainImage} source={truckImage} />
      <Text style={styles.subhead}>Treat Day Truck</Text>
      <StringList data={CATEGORIES} style={styles.categories} />
      <InfoWithIconList data={info} style={styles.info} />
    </Pressable>
  )
}

export default TrackCard
