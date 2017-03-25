export default {
  name: 'biphub-discord',
  description: 'Discord Bip for Biphub!',
  incomingActions: {
    message: {
      type: 'webhook/ws',
      name: 'message',
      conditions: ['matches', 'contains'],
      fields: {
        data: { type: 'string', name: 'data' },
      },
    },
  },
  outgoingActions: [
		{ name: 'createCard' },
		{ name: 'deleteCard' },
  ],
}
