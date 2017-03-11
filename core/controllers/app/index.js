import pubsub from '../../pubsub'
import config from '../../config'
import single from '../../models/single'

/**
 * Setup pubsub subscribers for communication with Apps
 */
const setup = () => {
  pubsub.subscribe(config.get('actions:register_app:event'), (payload) => {
    // TODO: Implement schema validator
    const app = {
      name: payload.name,
      description: payload.description,
    }
    const incomingActions = payload.incomingActions
    const outgoingActions = payload.outgoingActions
    single.App.registerApp({ app, incomingActions, outgoingActions }).then((result) => {
      console.log('successfully registered an App ', result.attributes.name)
    })
  })

  pubsub.subscribe(config.get('actions:ping:event'), (payload) => {
    console.log('Ping from ', payload)
  })
}

export default {
  setup,
}
