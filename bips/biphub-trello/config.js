export default {
  name: 'biphub-trello',
  incomingActions: {
    type: 'webhook',
    endpoint: '/trello',
    actions: [
      'issueCreated',
      'issueDeleted',
		],
	},
  outgoingActions: [
    'createIssue',
    'deleteIssue',
  ],

}
