export default {
  apps: {
    id: { type: 'increments' },
    name: { type: 'string' },
    label: { type: 'string' },
    instructions: { type: 'string' },
    icon: { type: 'string' },
    description: { type: 'string' },
    auth_type: { type: 'string' },
    active: { type: 'boolean' },
    timestamps: true
  },
  bips: {
    id: { type: 'increments' },
    active: { type: 'boolean' },
    /**
     * Chain must be in order inside an array
     * [
     *   {
     *     action_id: 123, // First action must be an incoming type action
     *   },
     *   {
     *     action_id: 124, // n+1th action must be outgoing type action
     *   },
     * ]
     */
    action_chain: { type: 'jsonb' }, // Entry point data during INCOMING_ACTION trying t find this bip
    incoming_app_name: { type: 'string' }, // Entry point data during INCOMING_ACTION trying to find this bip
    incoming_action_name: { type: 'string' },
    incoming_action_conditions_values: { type: 'jsonb' },
    incoming_action_options_values: { type: 'jsonb' },
    outgoing_action_options_values: { type: 'jsonb' },
    fields_mapping: { type: 'jsonb' },
    incoming_action_condition_id: { type: 'integer', references: 'action_conditions.id' },
    incoming_actions_id: { type: 'integer', references: 'actions.id' },
    outgoing_actions_id: { type: 'integer', references: 'actions.id' },
    timestamps: true
  },
  actions: {
    id: { type: 'increments' },
    type: { type: 'string' },
    endpoint: { type: 'string' },
    conditions: { type: 'jsonb' },
    name: { type: 'string' },
    description: { type: 'string' },
    timestamps: true,
    app_id: { type: 'integer', references: 'apps.id' }
  },
  action_conditions: {
    id: { type: 'increments' },
    active: { type: 'boolean' },
    name: { type: 'string' },
    condition_payload: { type: 'jsonb' },
    timestamps: true,
    action_id: { type: 'integer', references: 'actions.id' }
  },
  action_fields: {
    id: { type: 'increments' },
    type: { type: 'string' },
    name: { type: 'string' },
    timestamps: true,
    incoming_action_id: { type: 'integer', references: 'actions.id' }
  },
  action_options: {
    id: { type: 'increments' },
    type: { type: 'string' },
    name: { type: 'string' },
    active: { type: 'boolean' },
    timestamps: true,
    outgoing_action_id: { type: 'integer', references: 'actions.id' }
  }
}
