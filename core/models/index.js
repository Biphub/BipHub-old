import data from '../data'
import Bips from './Bips'
import IncomingActions from './IncomingActions'


async function getModels() {
  const bookshelf = await data()

  return {
    Bips: Bips(bookshelf),
    IncomingActions: IncomingActions(bookshelf),
  }
}

export default {
  getModels,
}
