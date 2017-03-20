import client from 'socket.io-client'
import SlackBots from 'slackbots'
import config from './config'
import password from '../.password/slack.password'

/**
 * Initiates this App
 */
function init() {
  const socket = client('http://localhost:8080/', { query: `appName=${config.name}` })
  const bot = new SlackBots({
    token: password.token,
    name: 'biphubbot',
  })

  socket.on('connect', () => {
    console.log('INFO: Slack app connected')
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
  })

  socket.on('disconnect', () => {
    // TODO: Implement reconnect
  })

  // Register trello Bip
  socket.emit('REGISTER_APP', config)


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
}

const getConfig = () => config

export default {
  init,
  getConfig,
}
