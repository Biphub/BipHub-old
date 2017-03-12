export default {
  name: 'biphub-slack',
  description: 'Slack bip for Biphub project!',
  incomingActions: [
    { type: 'webhook', endpoint: '/slack', action: '/issueCreated' },
		{ type: 'webhook', endpoint: '/slack', action: '/issueDeleted' },
		{ type: 'webhook', endpoint: '/slack', action: '/issueDeleted' },
  ],
  outgoingActions: [
		{ name: 'createIssue' },
		{ name: 'deleteIssue' },
  ],
  requirements: {
    auth: {
      method: 'token',
    },
  },
}
