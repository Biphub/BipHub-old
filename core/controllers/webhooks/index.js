import { Router } from 'express'
import incomingAction from '../../models/single/IncomingAction'
import urlHelper from '../../helpers/url'

/**
 * Route(/webhook)
 * @returns {*}
 */
export default () => {
  const webhook = Router()

	/**
   * Received webhook incoming action
   * Must handle payload as well
	 */
	webhook.use('/*', (req, res) => {
    const { endpoint, action } = urlHelper.getBipActions(req.originalUrl)
    incomingAction.findByEndPoint(endpoint, action).then((incomingAction) => {

    })
    res.json({ result: 'webhook received' })
  })
  return webhook
}
