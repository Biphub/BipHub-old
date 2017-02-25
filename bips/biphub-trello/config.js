export default {
  name: 'biphub-trello',
  incomingActions: [
    { type: 'webhook', endpoint: '/trello', action: 'issueCreated' },
		{ type: 'webhook', endpoint: '/trello2', action: 'issueDeleted' },
		{ type: 'webhook', endpoint: '/trello3', action: 'issueDeleted' },
  ],
  outgoingActions: [
		{ name: 'createIssue' },
		{ name: 'deleteIssue' },
  ],

}
