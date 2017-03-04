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
    incomingAction.findByEndPoint(endpoint, action).then((payload) => {
      console.log(payload)
    })
    pubsub.publish('test', 'test')
    res.json({ result: 'webhook received' })
  })
  return webhook
}
