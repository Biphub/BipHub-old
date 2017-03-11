import bookshelf from '../../bookshelf'
import API from '../single/App'

const APIs = bookshelf.Collection.extended({
  model: API,
})

export default APIs
