export const getImageBySize = (url: string, w: number, h: number) => {
  const lastIndex = url.lastIndexOf('/')
  const firstPart = url.substring(0, lastIndex)
  const lastPart = url.substring(lastIndex + 1)

  return `${firstPart}/${w}x${h}/${lastPart}`
}
