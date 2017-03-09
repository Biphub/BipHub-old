import bookshelf from '../../bookshelf'
import API from '../single/API'

const APIs = bookshelf.Collection.extended({
  model: API,
})

export default APIs
