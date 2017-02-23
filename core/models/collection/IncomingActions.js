import bookshelf from '../../bookshelf'
import IncomingAction from '../single/IncomingAction'

const IncomingActions = bookshelf.Collection.extended({
  model: IncomingAction,
})

export default IncomingActions
