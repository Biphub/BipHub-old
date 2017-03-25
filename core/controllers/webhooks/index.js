import { Router } from 'express'
import incomingAction from '../../models/IncomingAction'
import urlHelper from '../../helpers/url'
import pubsub from '../../pubsub'

/**
 * Route(/webhook)
 * @returns {*}
 */
export default () => {
  const webhook = Router()

	/**
   * Received webhook incoming action
	 */
  webhook.use('/*', (req, res) => {
    const { body, originalUrl } = req
    const { endpoint, action } = urlHelper.getApiActions(originalUrl)

    // Handle incoming action and publish it to APIs
    incomingAction.findByEndPoint(endpoint, action)
    .then(() => {
      const actionRoute = `${endpoint}:${action}`
      pubsub.publish({ action: actionRoute, data: body })
      res.json({ result: true })
    })
    .catch(() => {
      res.json({ result: false })
    })
  })
  return webhook
}
