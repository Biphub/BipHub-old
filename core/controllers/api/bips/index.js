const postBip = (req, res) => {
  const { body } = req

  console.log('posted a bip ', req.body)
}

const getBip = (req, res) => {

}

export default {
  postBip,
  getBip,
}
