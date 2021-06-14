import React, { FC, memo, useCallback } from 'react'
// libs
import { FlatList, Keyboard } from 'react-native'
// components
import TruckCard from 'screens/MainScreen/components/TruckCard'
// types
import { Truck } from 'store/trucks/types'
import { FoodCategory } from 'store/foodCategories/types'
// styles
import styles from 'screens/SearchTruckModal/styles'

interface IProps {
  searchResult: Truck[]
  onPress: (id: number) => void
}

const SearchResults: FC<IProps> = ({ searchResult, onPress }) => {
  const renderSearchItem = useCallback(({ item }) => <TruckCard item={item} onPress={() => onPress(item.id)} />, [
    onPress,
  ])

  const keyExtractor = useCallback((item: Truck | FoodCategory) => `${item.id}`, [])

  return (
    <FlatList
      keyboardShouldPersistTaps='always'
      contentContainerStyle={styles.searchContent}
      data={searchResult}
      renderItem={renderSearchItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={Keyboard.dismiss}
    />
  )
}

export default memo(SearchResults)
