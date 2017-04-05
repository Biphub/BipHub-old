export default {
  name: 'biphub-discord',
  description: 'Discord Bip for Biphub!',
  incomingActions: {
    message: {
      type: 'webhook/ws',
      name: 'message',
      conditions: ['matches', 'contains'],
      fields: {
        content: { type: 'string', name: 'content' },
      },
      options: {
        channel: { type: 'string', name: 'channel' },
      },
    },
  },
  outgoingActions: [
		{ name: 'createCard' },
		{ name: 'deleteCard' },
  ],
}
