import { Router } from 'express'
import facets from './facets'

export default () => {
  const api = Router()

	// mount the facets resource
  api.use('/facets', facets())

	// perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version: 1 })
  })

  return api
}
