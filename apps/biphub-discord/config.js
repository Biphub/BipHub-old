export default {
  name: 'biphub-discord',
  description: 'Discord Bip for Biphub!',
  incomingActions: [
		{ type: 'webhook', endpoint: '/discord', namn: '/cardCreated' },
		{ type: 'webhook', endpoint: '/discord', name: '/cardDeleted' },
		{ type: 'webhook', endpoint: '/discord', name: '/cardMoved' },
  ],
  outgoingActions: [
		{ name: 'createCard' },
		{ name: 'deleteCard' },
  ],
}
