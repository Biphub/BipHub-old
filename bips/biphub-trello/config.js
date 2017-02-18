export default {
  name: 'biphub-trello',
  incomingActions: [
    'issueCreated',
    'issueDeleted',
  ],
  outgoingActions: [
    'createIssue',
    'deleteIssue',
  ],
}
