import Sequelize from 'sequelize'
import connection from '../data/db/connection'

const Bip = connection.define('Bip', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
})

export default Bip
