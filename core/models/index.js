import data from '../data'
import Bips from './Bips'

const { bookshelf } = data

export default {
  Bips: Bips(bookshelf),
}
