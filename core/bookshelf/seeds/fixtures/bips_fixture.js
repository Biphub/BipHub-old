exports.default = [
  // Assumptions: incoming action is discord onMessage
  // outgoing action is slack send message
  {
    id: 1,
    active: true,
    action_chain: JSON.stringify([
      {
        app_name: 'biphub-discord',
        action_name: 'message'
      },
      {
        app_name: 'biphub-slack',
        action_name: 'post_message'
      }
    ]),
    incoming_app_name: 'biphub-discord',
    incoming_action_name: 'message',
    incoming_action_condition_names: JSON.stringify(['contains'])
  }
]
