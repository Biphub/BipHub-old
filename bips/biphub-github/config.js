export default {
  name: 'biphub-github',
  incomingActions: [
		{ type: 'webhook', endpoint: '/github', action: 'cardCreated' },
		{ type: 'webhook', endpoint: '/github1', action: 'cardDeleted' },
		{ type: 'webhook', endpoint: '/github2', action: 'cardMoved' },
  ],
  outgoingActions: [
		{ name: 'createCard' },
		{ name: 'deleteCard' },
  ],
}
