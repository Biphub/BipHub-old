export default {
  name: 'biphub-github',
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
