import client from 'socket.io-client'
import SlackBots from 'slackbots'
import config from './config'

function init() {
  const socket = client('http://localhost:8080/')
  socket.on('connect', () => {
    // console.log('trello connected')
  })

  socket.on('disconnect', () => {
    // console.log('disconnected')
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
    const params = {
      icon_emoji: ':cat:',
    }

		// define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'meow!', params)

		// define existing username instead of 'user_name'
    bot.postMessageToUser('visualbbasic', 'meow!', params)

		// If you add a 'slackbot' property,
		// you will post to another user's slackbot channel instead of a direct message
    bot.postMessageToUser('user_name', 'meow!', { slackbot: true, icon_emoji: ':cat:' })

		// define private group instead of 'private_group', where bot exist
    bot.postMessageToGroup('private_group', 'meow!', params)
  })

  bot.on('message', (data) => {
		// all ingoing events https://api.slack.com/rtm
    console.log(data)
  })
}

const getConfig = () => config

export default {
  init,
  getConfig,
}
