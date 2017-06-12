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
        action_name: 'post_message',
        // link between one of incoming action's field and outgoing action's field
        fields_link: [
          {
            app_name: 'biphub-discord',
            action_name: 'message',
            field_name: 'content'
          },
          {
            app_name: 'biphub-slack',
            action_name: 'post_message',
            field_name: 'data'
          }
        ]
      }
    ]),
    incoming_app_name: 'biphub-discord',
    incoming_action_name: 'message',
    incoming_action_condition_names: JSON.stringify([
      {
        name: 'contains',
        testCase: 'test',
        required_fields: ['content']
      }
    ])
  }
]
