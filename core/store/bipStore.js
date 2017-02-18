import base from './base'

const BIP_STORE_KEY = 'bips'

const set = (bips) => {
  base.set(BIP_STORE_KEY, bips)
}

const get = () => base.get(BIP_STORE_KEY)

export default {
  set,
  get,
}
