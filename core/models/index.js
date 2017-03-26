import '../bookshelf' // Force inits DB connection
import App from './App'
import Bip from './Bip'
import IncomingAction from './IncomingAction'
import OutgoingAction from './OutgoingAction'
import IncomingActionField from './IncomingActionField'
import OutgoingActionField from './OutgoingActionField'
import IncomingActionCondition from './IncomingActionCondition'

export default {
  App: App.single,
  Apps: App.collection,
  Bip: Bip.single,
  Bips: Bip.collection,
  IncomingAction: IncomingAction.single,
  IncomingActions: IncomingAction.collection,
  OutgoingAction: OutgoingAction.single,
  OutgoingActions: OutgoingAction.collection,
  IncomingActionField: IncomingActionField.single,
  IncomingActionFields: IncomingActionField.collection,
  OutgoingActionField: OutgoingActionField.single,
  OutgoingActionFields: OutgoingActionField.collection,
  IncomingActionCondition: IncomingActionCondition.single,
  IncomingActionConditions: IncomingActionCondition.collection,
}
