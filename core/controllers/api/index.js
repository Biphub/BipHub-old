import { Router } from 'express'
import single from '../../models/single'

export default () => {
  const api = Router()

  api.get('/app', (req, res) => {
    console.log('get all apps')
    single.App.listAll().then((result) => {
      res.json({ result })
    })
  })

	// perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version: 1 })
  })
  return api
}
