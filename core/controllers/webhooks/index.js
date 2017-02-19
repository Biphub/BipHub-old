import { Router } from 'express'

export default () => {
  const webhook = Router()

  webhook.use('/test', (req, res) => {
    console.log('webook receied!')

    res.json({ result: 'webhook received' })
  })

  return webhook
}
