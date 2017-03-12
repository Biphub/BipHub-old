import { Router } from 'express'
import config from '../../config'
import single from '../../models/single'

export default () => {
  const api = Router()

	/**
   * Retrieves all apps
   * /apps
	 */
  api.get('/apps', (req, res) => {
    console.log('get all apps')
    single.App.listAll().then((result) => {
      res.json({ result })
    })
  })

	/**
   * Retreives index info of api
	 */
  api.get('/', (req, res) => {
    const result = config.get('api')
    res.json({ result })
  })
  return api
}
