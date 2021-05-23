import React, { memo, ReactElement, forwardRef, ForwardedRef } from 'react'
// libs
import { ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'
import map from 'lodash.map'
// components
import Typography, { TypographyVariants } from 'components/Typography'
// styles
import { Colors } from 'styles'
import styles from './styles'

interface ICategory {
  id: number
  name: string
  icon: string | ReactElement
}

interface IProps {
  data: ICategory[]
  active?: number[]
  onPress: (id: number) => void
}

interface ICategoryProps {
  item: ICategory
  onPress?: (id: number) => void
  active?: number[]
}

const Category = ({ item, onPress, active }: ICategoryProps) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress && onPress(item.id)}>
    <View style={styles.icon}>
      {typeof item.icon === 'string' ? <SvgFromUri width={24} height={24} uri={item.icon} /> : item.icon}
    </View>
    <Typography
      style={styles.itemLabel}
      variant={TypographyVariants.body}
      weight={active?.includes(item.id) ? 'bold' : 'normal'}
      color={active?.includes(item.id) ? Colors.cadmiumOrange : undefined}
    >
      {item.name}
    </Typography>
  </TouchableOpacity>
)

const Categories = forwardRef(({ data, onPress, active }: IProps, ref: ForwardedRef<ScrollView>) => {
  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      {map(data, (i, index) => (
        <Category key={index} active={active} item={i} onPress={onPress} />
      ))}
    </ScrollView>
  )
})

export default memo(Categories)
