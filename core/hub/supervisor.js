import requireAll from 'require-all'

function loadBips() {
  const bips = requireAll(`${__dirname}/../../bips`)
  console.log(bips)
}

function restartBips() {
  const bips = requireAll(`${__dirname}/../../bips`)
  console.log(bips)
}

export default {
  loadBips,
  restartBips,
}
