import React, { memo, FC } from 'react'
import { PressableProps } from 'react-native'
import Button, { ButtonTypes } from 'components/Button/index'
import SearchIcon from 'assets/svg/search.svg'

const SearchButton: FC<PressableProps> = (props) => (
  <Button type={ButtonTypes.icon} {...props}>
    <SearchIcon />
  </Button>
)

export default memo(SearchButton)
