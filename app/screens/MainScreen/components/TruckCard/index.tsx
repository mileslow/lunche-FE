import React, { useMemo, Fragment } from 'react'
import { Pressable, Image, Text, View } from 'react-native'
import map from 'lodash.map'
// assets
import ClockIcon from 'assets/svg/clock.svg'
import DistanceIcon from 'assets/svg/distance.svg'
import RatingsIcon from 'assets/svg/ratings.svg'
import truckImage from './BG.png'
// styles
import styles from './styles'

const CATEGORIES = ['Chinese', 'American', 'Deshi food']

const TrackCard = () => {
  const categories = useMemo(
    () => (
      <View style={styles.categories}>
        {map(CATEGORIES, (i, index) => (
          <Fragment key={index}>
            <Text style={styles.category}>{i}</Text>
            {index < CATEGORIES.length - 1 && <View style={styles.point} />}
          </Fragment>
        ))}
      </View>
    ),
    [],
  )

  return (
    <Pressable style={styles.card}>
      <Image style={styles.mainImage} source={truckImage} />
      <Text style={styles.subhead}>Treat Day Truck</Text>
      {categories}
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <RatingsIcon />
          <Text style={styles.infoText}>4.3 (200+ ratings)</Text>
        </View>
        <View style={styles.infoItem}>
          <ClockIcon />
          <Text style={styles.infoText}>25 min</Text>
        </View>
        <View style={styles.infoItem}>
          <DistanceIcon />
          <Text style={styles.infoText}>2 km</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default TrackCard
