export const getData = async () => {
  return fetch('/api/stocks').then((res) => {
    return res.json()
  })
}
