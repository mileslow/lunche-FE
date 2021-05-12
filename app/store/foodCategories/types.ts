export type FoodCategoriesSliceState = {
  resources: FoodCategory[]
}

export type FoodCategory = {
  icon: string
  id: number
  name: string
  createdAt: string
  updatedAt: string
}
