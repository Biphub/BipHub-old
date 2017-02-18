const getId = () => 1

const getName = () => 'biphub-trello'


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

const getConfig = () => ({
  id: getId(),
  name: getName(),
  incomingActions: getIncomingActions(),
  outgoingActions: getOutgoingActions(),
})

export default {
  getId,
  getName,
  getIncomingActions,
  getOutgoingActions,
  getConfig,
}
