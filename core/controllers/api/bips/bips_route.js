/**
 * Post a single bip and register it
 * @param req
 */
const postBip = (req) => {
  console.log('posted a bip ', req.body)
}

/**
 * Get a single bip by posting queries
 */
const getBip = () => {
  console.log('get a bip')
}

export default {
  postBip,
  getBip
}
