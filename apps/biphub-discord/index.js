import Discord from 'discord.js'
import client from 'socket.io-client'
import config from './config'
import password from '../.password/discord.password'

function init() {
  const socket = client('http://localhost:8080/', { query: `appName=${config.name}` })

  // General Socket.io client events
  socket.on('connect', () => {
    socket.emit('REGISTER_APP', config)
  })
  socket.on('testEvent', () => {
  })
  socket.on('disconnect', () => {
  })
  const discordClient = new Discord.Client()

  // General Discord events
  // 1. On connect
  discordClient.on('ready', () => {
    console.log('INFO: Discord app ready')
  })

  // Discord Incoming Events
  // 1. on message
  discordClient.on('message', (message) => {
    // Note: simply declare messages as if else
    if (message.type === 'default') {
      socket.emit('BIP', {
        data: message.content,
        meta: config.incomingActions.message,
      })
    }
  })

  discordClient.login(password.token)

  // Incoming action conditions check
  // 1. message contains
  const conditionMessageName = `${config.name}_message_contains`
  socket.on(conditionMessageName, ({ payload, condition }, reply) => {
    const parsed = JSON.parse(condition)
    if (parsed && payload && payload.data.includes(parsed.subject)) {
      console.log('INFO: discord passed on message conditions test!')
      reply(true)
    } else {
      console.log('WARN: discord failed contains test!')
      reply(false)
    }
  })

  // Outgoing actions
}

export default {
  init,
}
