import bookshelf from '../../bookshelf'
import Bip from '../single/Bip'

const Bips = bookshelf.Collection.extended({
  model: Bip,
})

export default Bips
