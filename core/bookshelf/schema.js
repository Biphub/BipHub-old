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
    incoming_action_conditions_values: { type: 'jsonb' },
    incoming_action_options_values: { type: 'jsonb' },
    outgoing_action_options_values: { type: 'jsonb' },
    fields_mapping: { type: 'jsonb' },
    active: { type: 'boolean' },
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
