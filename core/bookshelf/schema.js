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
    incoming_action_condition_id: { type: 'integer', references: 'incoming_action_conditions.id' },
    incoming_actions_id: { type: 'integer', references: 'incoming_actions.id' },
    outgoing_actions_id: { type: 'integer', references: 'outgoing_actions.id' },
    timestamps: true
  }
}
