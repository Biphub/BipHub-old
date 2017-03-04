import { Router } from 'express'
import incomingAction from '../../models/single/IncomingAction'
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
    const { endpoint, action } = urlHelper.getBipActions(req.originalUrl)

    incomingAction.findByEndPoint(endpoint, action).then(() => {
      const actionRoute = `${endpoint}:${action}`
      console.log(actionRoute)
      pubsub.publish(actionRoute, 'test')
      res.json({ result: 'webhook received' })
    })
  })
  return webhook
}
