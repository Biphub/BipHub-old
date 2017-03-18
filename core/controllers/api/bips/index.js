/**
 * Post a single bip and register it
 * @param req
 * @param res
 */
const postBip = (req, res) => {
  const { body } = req

  console.log('posted a bip ', req.body)
}

/**
 * Get a single bip by posting queries
 */
const getBip = (req, res) => {

}

export default {
  postBip,
  getBip,
}
