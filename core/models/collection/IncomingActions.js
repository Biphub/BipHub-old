import bookshelf from '../../bookshelf'
import IncomingAction from '../single/IncomingAction'

const IncomingActions = bookshelf.Collection.extended({
  model: IncomingAction,
  hasTimestamps: true,
})

export default IncomingActions
