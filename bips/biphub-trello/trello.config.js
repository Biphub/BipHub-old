const getId = () => ({
  id: 1,
})

const getName = () => ({
  name: 'biphub-trello',
})

const getIncomingActions = () => [
  'issueCreated',
  'issueDeleted',
  'issueMoved',
]

const getOutgoingActions = () => [
  'postIssue',
  'deleteIssue',
  'moveIssue',
]

const getConfig = () => {

}

export default {
  getId,
  getName,
  getIncomingActions,
  getOutgoingActions,
  getConfig,
}
