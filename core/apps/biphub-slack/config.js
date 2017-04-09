export default {
  name: 'biphub-slack',
  description: 'Slack bip for Biphub project!',
  instruction: 'https://api.slack.com/rtm',
  incomingActions: {
    accountChanged: { type: 'webhook/ws', name: 'account_changed' },
    botAdded: { type: 'webhook/ws', name: 'bot_added' },
    botChanged: { type: 'webhook/ws', name: 'bot_changed' },
    channelArchived: { type: 'webhook/ws', name: 'channel_archived' },
    channelCreated: { type: 'webhook/ws', name: 'channel_created' },
    channelHistoryChanged: { type: 'webhook/ws', name: 'channel_history_changed' },
    channelJoined: { type: 'webhook/ws', name: 'channel_joined' },
    channelLeft: { type: 'webhook/ws', name: 'channel_left' },
    channelMarked: { type: 'webhook/ws', name: 'channel_marked' },
    channelRename: { type: 'webhook/ws', name: 'channel_rename' },
    channelUnarchive: { type: 'webhook/ws', name: 'channel_unarchive' },
    commandsChanged: { type: 'webhook/ws', name: 'commands_changed' },
    dndUpdated: { type: 'webhook/ws', name: 'dnd_updated' },
    dndUpdatedUser: { type: 'webhook/ws', name: 'dnd_updated_user' },
    emailDomainChanged: { type: 'webhook/ws', name: 'email_domain_changed' },
    emojiChanged: { type: 'webhook/ws', name: 'emoji_changed' },
    fileChange: { type: 'webhook/ws', name: 'file_change' },
    message: { type: 'webhook/ws', name: 'message', conditions: ['matches', 'contains'] }
  },
  outgoingActions: {
    postMessage: {
      type: 'webhook/ws',
      name: 'post_message',
      fields: {
        data: { type: 'string', name: 'data' }
      }
    }
  },
  requirements: {
    auth: {
      method: 'token'
    }
  }
}
