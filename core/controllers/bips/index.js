import pubsub from '../../pubsub'
import config from '../../config'
import single from '../../models/single'

/**
 * Setup pubsub subscribers for communication with bips
 */
const setup = () => {
  pubsub.subscribe(config.get('actions:register_bip:event'), (payload) => {
    // TODO: Implement schema validator
    const bip = {
      name: payload.name,
      description: payload.description,
    }
    const incomingActions = payload.incomingActions
    const outgoingActions = payload.outgoingActions
    single.Bip.registerBip({ bip, incomingActions, outgoingActions }).then((result) => {
      console.log('successfully registered a bip ', result.attributes.name)
    })
  })

  pubsub.subscribe(config.get('actions:ping:event'), (payload) => {
    console.log('Ping from ', payload)
  })
}

export default {
  setup,
}
