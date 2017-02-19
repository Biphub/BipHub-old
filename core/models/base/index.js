import Bookshelf from 'bookshelf'
import connection from '../../data/db/connection'

const getBookshelf = () => {
	const bookshelfInstance = Bookshelf(connection)
}
