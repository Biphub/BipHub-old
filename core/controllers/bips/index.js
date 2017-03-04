import pubsub from '../../pubsub'
import config from '../../config'

export default () => {
  pubsub.subscribe(config.get('actions:register_bip:event'), (payload) => {
    console.log('register bip received payload ', payload)
  })
}
