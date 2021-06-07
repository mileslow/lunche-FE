import React, { useCallback, ReactElement, forwardRef, ForwardedRef, useMemo } from 'react'
import { ActivityIndicator, FlatList, FlatListProps } from 'react-native'
import Animated from 'react-native-reanimated'

export interface IProps<ItemT> extends FlatListProps<ItemT> {
  loadResources: ({ page }: { page: number }) => void
  isLoading: boolean
  meta: {
    page: number
    pageCount: number
  }
  data: ItemT[]
  animatedProps?: { scrollEnabled?: boolean }
  isAnimated?: boolean
}

export function InfiniteScroll<ItemT = unknown>(
  { data, loadResources, isLoading, meta, isAnimated, ...other }: IProps<ItemT>,
  ref: ForwardedRef<any>,
): ReactElement {
  const keyExtractor = (item: { id?: number }, index: number) => `${item?.id || index}`

  const handleRefresh = useCallback(() => {
    if (data.length && !isLoading && meta.page < meta.pageCount) {
      loadResources({ page: meta.page + 1 })
    }
  }, [data, isLoading, meta, loadResources])

  const renderFooter = useCallback(() => <ActivityIndicator animating={isLoading} size='small' />, [isLoading])

  const List = useMemo(
    () => (isAnimated ? Animated.createAnimatedComponent<FlatListProps<ItemT>>(FlatList) : FlatList),
    [isAnimated],
  )

  return (
    <List
      ref={ref}
      ListFooterComponent={renderFooter}
      keyExtractor={keyExtractor}
      onEndReached={handleRefresh}
      onEndReachedThreshold={0.01}
      data={data}
      {...other}
    />
  )
}

export default forwardRef(InfiniteScroll) as <ItemT = unknown>(
  props: IProps<ItemT>,
  ref: ForwardedRef<unknown>,
) => ReturnType<typeof InfiniteScroll>
