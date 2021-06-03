export type FoodCategoriesSliceState = {
  resources: FoodCategory[]
}

export type FoodCategory = {
  icon: string
  id: number
  name: string
  photo: string
  createdAt: string
  updatedAt: string
}
