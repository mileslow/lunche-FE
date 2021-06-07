import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite, removeFavorite } from 'store/favorites/thunks'
import { truckSelector } from 'store/trucks/selectors'
import { AppDispatch } from 'store'

const useToggleFavoritePress = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentTruck = useSelector(truckSelector)

  const [isLoading, setLoading] = useState(false)

  const toggleFavoritePress = useCallback(async () => {
    setLoading(true)
    if (currentTruck.isFavorite) {
      await dispatch(removeFavorite(currentTruck.id))
    } else {
      await dispatch(createFavorite(currentTruck.id))
    }
    setLoading(false)
  }, [dispatch, currentTruck])

  return {
    isLoadingFavorite: isLoading,
    toggleFavoritePress,
  }
}

export default useToggleFavoritePress
