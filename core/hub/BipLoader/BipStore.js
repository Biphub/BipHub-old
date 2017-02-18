const bips = []

// TODO: Implement logic to check duplicated bip
const storeBip = (bip) => {
  bips.push(bip)
}

const removeBip = (index) => {
  bips.splice(index, 1)
}

const getBips = () => bips

export default {
  storeBip,
  removeBip,
  getBips,
}
