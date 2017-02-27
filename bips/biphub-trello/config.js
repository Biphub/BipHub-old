export default {
  name: 'biphub-trello',
  incomingActions: [
    { type: 'webhook', endpoint: '/trello', action: '/issueCreated' },
		{ type: 'webhook', endpoint: '/trello', action: '/issueDeleted' },
		{ type: 'webhook', endpoint: '/trello', action: '/issueDeleted' },
  ],
  outgoingActions: [
		{ name: 'createIssue' },
		{ name: 'deleteIssue' },
  ],

}
