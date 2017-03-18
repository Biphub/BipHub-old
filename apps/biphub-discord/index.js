import Discord from 'discord.js'
import client from 'socket.io-client'
import config from './config'
import password from '../.password/discord.password'

function init() {
  const socket = client('http://localhost:8080/', { query: `bipName=${config.name}` })
  socket.on('connect', () => {
  })
  socket.on('testEvent', () => {
  })
  socket.on('disconnect', () => {
  })
  socket.on('discord:issueCreated', (payload) => {
    console.log('creating issue! ', payload)
  })
  socket.emit('REGISTER_APP', config)

  const discordClient = new Discord.Client()

  discordClient.on('ready', () => {
    console.log('I am Discord and I am ready!')
  })

  discordClient.on('message', (message) => {
    const payload = {}
    payload.event = 'INCOMING_ACTION'
    switch (message.type) {
      case 'DEFAULT':
        payload.data = message.content
        payload.meta = config.incomingActions.message
        break
      default:
    }
    console.log('emitting new payload! ', payload)
    socket.emit(payload.event, { data: payload.data, meta: payload.meta })
  })

  discordClient.login(password.token)
}

export default {
  init,
}
