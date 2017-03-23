import client from 'socket.io-client'
import SlackBots from 'slackbots'
import config from './config'
import password from '../.password/slack.password'

/**
 * Initiates this App
 */
function init() {
  const appName = config.name
  const socket = client('http://localhost:8080/', { query: `appName=${config.name}` })
  const bot = new SlackBots({
    token: password.token,
    name: 'biphubbot',
  })

  socket.on('connect', () => {
    console.log('INFO: Slack app connected')
		// Register Slack Bip
    socket.emit('REGISTER_APP', config)
  })

  socket.on('disconnect', () => {
    // TODO: Implement reconnect
  })

  // Slack incoming actions
  bot.on('message', (data) => {
		// all ingoing events https://api.slack.com/rtm
    const { type } = data
    const payload = {}
    payload.event = 'INCOMING_ACTION'
    switch (type) {
      case 'message':
        payload.data = data
        payload.meta = config.incomingActions.message
        break
      default:
        console.log('INFO: Slack ping!')
        break
    }
    socket.emit(payload.event, {
      data: payload.data,
      meta: payload.meta,
    })
  })

  // Slack outgoing actions
  socket.on(`${appName}_${config.outgoingActions.postMessage.name}`, (data) => {
    console.log('slack: post message received')
    bot.postMessage('general', `test bip forward ${data}`, null)
  })
}

const getConfig = () => config

export default {
  init,
  getConfig,
}
