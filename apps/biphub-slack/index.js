import client from 'socket.io-client'
import SlackBots from 'slackbots'
import config from './config'

/**
 * Initiates this App
 */
function init() {
  const socket = client('http://localhost:8080/', { query: `bipName=${config.name}` })
  socket.on('connect', () => {
  })

  socket.on('disconnect', () => {
    // TODO: Implement reconnect
  })
  socket.on('test', () => {
    console.log('test pubsub from client')
  })

  // Register trello Bip
  socket.emit('REGISTER_APP', config)

  // Slack test
  const bot = new SlackBots({
    token: 'xoxb-153818245495-tokNO6F1RKrFj15IGXfZBnpQ',
    name: 'biphubbot',
  })

  bot.on('start', () => {
		// more information about additional params https://api.slack.com/methods/chat.postMessage
		// const params = {
    //  icon_emoji: ':cat:',
		// }

		// define channel, where bot exist. You can adjust it there https://my.slack.com/services
    // bot.postMessageToChannel('general', 'meow!', params)

		// define existing username instead of 'user_name'
    // bot.postMessageToUser('visualbbasic', 'meow!', params)

		// If you add a 'slackbot' property,
		// you will post to another user's slackbot channel instead of a direct message
    // bot.postMessageToUser('user_name', 'meow!', { slackbot: true, icon_emoji: ':cat:' })

		// define private group instead of 'private_group', where bot exist
    // bot.postMessageToGroup('private_group', 'meow!', params)
  })

  bot.on('message', (data) => {
		// all ingoing events https://api.slack.com/rtm
    const { type } = data
    const payload = {}
    switch (type) {
      case 'message':
        console.log(data)
        payload.event = 'INCOMING_ACTION'
        payload.data = data
        payload.meta = config.incomingActions.message
        break
      default:
        console.log('nothing!')
        break
    }
    socket.emit(payload.event, formatPayload(payload.data, payload.meta))
  })
}

/**
 * Formats payload
 * @param payload
 * @param meta
 * @returns {{payload: *, meta: *}}
 */
function formatPayload(payload, meta) {
  return {
    payload,
    meta,
  }
}

const getConfig = () => config

export default {
  init,
  getConfig,
}
