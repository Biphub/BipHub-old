import Sequelize from 'sequelize'
import config from '../../config'

let sequelize = null

const getSequelize = () => {
  if (!sequelize) {
    console.log('sequlize initiating ', sequelize)
    sequelize = new Sequelize(null, null, null, config.get('database'))
    return sequelize
  }
  return null
}

export default getSequelize()
