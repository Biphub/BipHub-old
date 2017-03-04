export default {
  name: 'biphub-discord',
  description: 'Discord Bip for Biphub!',
  incomingActions: [
		{ type: 'webhook', endpoint: '/github', action: '/cardCreated' },
		{ type: 'webhook', endpoint: '/github', action: '/cardDeleted' },
		{ type: 'webhook', endpoint: '/github', action: '/cardMoved' },
  ],
  outgoingActions: [
		{ name: 'createCard' },
		{ name: 'deleteCard' },
  ],
}
