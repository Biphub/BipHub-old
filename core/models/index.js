import data from '../data'
import Bips from './Bips'
import IncomingActions from './IncomingActions'
import OutgoingActions from './OutgoingActions'

async function getModels() {
  const bookshelf = await data()

  return {
    Bips: Bips(bookshelf),
    IncomingActions: IncomingActions(bookshelf),
    OutgoingActions: OutgoingActions(bookshelf),
  }
}

export default {
  getModels,
}
