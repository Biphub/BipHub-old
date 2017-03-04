import pubsub from '../../pubsub'
import config from '../../config'

export default () => {
  console.log(config.get('actions'))
}
