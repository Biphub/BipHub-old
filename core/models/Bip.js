import base from './base'
import bookshelf from '../bookshelf'

const Bip = base.extend({
  tableName: 'bips',
  hasTimestamps: true,
})

export default bookshelf.model('Bip', Bip)
