import pubsub from '../../pubsub'
import config from '../../config'
import single from '../../models/single'

/**
 * Setup pubsub subscribers for communication with APIs
 */
const setup = () => {
  pubsub.subscribe(config.get('actions:register_api:event'), (payload) => {
    // TODO: Implement schema validator
    const api = {
      name: payload.name,
      description: payload.description,
    }
    const incomingActions = payload.incomingActions
    const outgoingActions = payload.outgoingActions
    single.API.registerAPI({ api, incomingActions, outgoingActions }).then((result) => {
      console.log('successfully registered an API ', result.attributes.name)
    })
  })

  pubsub.subscribe(config.get('actions:ping:event'), (payload) => {
    console.log('Ping from ', payload)
  })
}

export default {
  setup,
}
