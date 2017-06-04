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

    // Note: simply declare event as if else
    if (type === 'message') {
      socket.emit('INCOMING_ACTION', {
        data,
        meta: config.incomingActions.message,
      })
    }
  })

  // Slack outgoing actions
  // Note: simply below config.outgoingactions....
  socket.on(`biphub-slack_post_message`, (data) => {
    console.log('slack: post message received')
    bot.postMessage('general', `test bip forward ${data}`, null)
  })
}

const getConfig = () => config

export default {
  init,
  getConfig,
}
