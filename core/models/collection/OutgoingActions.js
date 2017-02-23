import bookshelf from '../../bookshelf'
import OutgoingAction from '../single/OutgoingAction'

const OutgoingActions = bookshelf.Collection.extended({
  model: OutgoingAction,
})

export default OutgoingActions
