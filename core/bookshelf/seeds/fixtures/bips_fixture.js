exports.default = [
  { id: 1,
    active: true,
    incoming_action_conditions_value: {
      matches: { value: 'test' }
    },
    incoming_action_options_value: {
      channel: { value: 'general' }
    },
    outgoing_action_options_value: {
      channel: { value: 'general' }
    },
    // Fields mapping, inc ID to out ID
    fields_mapping: [
      [1, 1]
    ]
  }
];
