import App from './App'
import Bip from './Bip'
import Action from './Action'
import ActionField from './ActionField'
import ActionCondition from './ActionCondition'
import ActionOption from './ActionOption'

export default {
  App: App.single,
  Apps: App.collection,
  Bip: Bip.single,
  Bips: Bip.collection,
  Action: Action.single,
  Actions: Action.collection,
  ActionField: ActionField.single,
  ActionFields: ActionField.collection,
  ActionCondition: ActionCondition.single,
  ActionConditions: ActionCondition.collection,
  ActionOption: ActionOption.single,
  ActionOptions: ActionOption.collection
}
