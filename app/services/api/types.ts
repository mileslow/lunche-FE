export type Meta = {
  total: number
  count: number
  page: number
  pageCount: number
}

export type DataWithMeta<T> = { data: T } & Meta
