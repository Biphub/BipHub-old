const getBipActions = (originalUrl) => {
  const split = originalUrl.split('/')
  return {
    endpoint: split[2],
    action: split[3],
  }
}

export default {
  getBipActions,
}
