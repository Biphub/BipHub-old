import server from './Server'
import pubsub from '../../pubsub'

pubsub.subscribe('REGISTER_BIP2', (d) => {
  console.log('testing! ', d)
})

export default server
