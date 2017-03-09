const getApiActions = (originalUrl) => {
  const split = originalUrl.split('/')
  split.shift()
  return {
    endpoint: split[1],
    action: split[2],
  }
}

export default {
  getApiActions,
}
