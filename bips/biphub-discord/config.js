export default {
  name: 'biphub-discord',
  description: 'Discord Bip for Biphub!',
  incomingActions: [
		{ type: 'webhook', endpoint: '/discord', action: '/cardCreated' },
		{ type: 'webhook', endpoint: '/discord', action: '/cardDeleted' },
		{ type: 'webhook', endpoint: '/discord', action: '/cardMoved' },
  ],
  outgoingActions: [
		{ name: 'createCard' },
		{ name: 'deleteCard' },
  ],
}
