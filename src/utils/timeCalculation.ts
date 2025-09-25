export const getTotalSeconds = (elapsedTime: number) => Math.floor(elapsedTime / 1000)
export const getMinutes = (totalSeconds: number) => Math.floor(totalSeconds / 60)
export const getSeconds = (totalSeconds: number) => totalSeconds % 60
export const formatTime = (elapsedTime: number) => {
  const total = getTotalSeconds(elapsedTime)
  const minutes = getMinutes(total)
  const seconds = getSeconds(total)
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}
