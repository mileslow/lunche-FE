import React, { FC, memo, useCallback } from 'react'
// libs
import { FlatList, ImageBackground, Keyboard, View } from 'react-native'
// components
import Typography, { TypographyVariants } from 'components/Typography'
import Button, { ButtonTypes } from 'components/Button'
// types
import { Truck } from 'store/trucks/types'
import { FoodCategory } from 'store/foodCategories/types'
// utils
import { getImageBySize } from 'services/utils'
// styles
import styles, { CATEGORY_HEIGHT, CATEGORY_WIDTH } from 'screens/SearchTruckModal/styles'
import { Colors } from 'styles'

interface IProp {
  foodCategories: FoodCategory[]
  setCategory: (name: string) => void
}

const CategoriesList: FC<IProp> = ({ foodCategories, setCategory }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <Button style={styles.category} type={ButtonTypes.link} onPress={() => setCategory(item.name)}>
        <ImageBackground
          key={item.id}
          source={{ uri: getImageBySize(item.photo, CATEGORY_WIDTH, CATEGORY_HEIGHT), cache: 'force-cache' }}
          style={styles.categoryImage}
        >
          <View style={styles.overlay} />
          <Typography variant={TypographyVariants.subhead} color={Colors.basic}>
            {item.name}
          </Typography>
        </ImageBackground>
      </Button>
    ),
    [setCategory],
  )

  const keyExtractor = useCallback((item: Truck | FoodCategory) => `${item.id}`, [])

  return (
    <FlatList
      keyboardShouldPersistTaps='always'
      horizontal={false}
      numColumns={2}
      contentContainerStyle={styles.scrollContent}
      data={foodCategories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onScrollBeginDrag={Keyboard.dismiss}
    />
  )
}

export default memo(CategoriesList)
