export default {
  name: 'biphub-slack',
  label: 'Slack',
  description: "Slack brings all your communication together in one place. It's real-time messaging, archiving and search for modern teams.",
  instructions: 'https://api.slack.com/rtm',
  icon: 'icon-slack.png',
  incomingActions: {
    accountChanged: {
      type: 'webhook/ws',
      name: 'account_changed'
    },
    botAdded: { name: 'bot_added' },
    botChanged: { name: 'bot_changed' },
    channelArchived: { name: 'channel_archived' },
    channelCreated: { name: 'channel_created' },
    channelHistoryChanged: { name: 'channel_history_changed' },
    channelJoined: { name: 'channel_joined' },
    channelLeft: { name: 'channel_left' },
    channelMarked: { name: 'channel_marked' },
    channelRename: { name: 'channel_rename' },
    channelUnarchive: { name: 'channel_unarchive' },
    commandsChanged: { name: 'commands_changed' },
    dndUpdated: { name: 'dnd_updated' },
    dndUpdatedUser: { name: 'dnd_updated_user' },
    emailDomainChanged: { name: 'email_domain_changed' },
    emojiChanged: { name: 'emoji_changed' },
    fileChange: { name: 'file_change' },
    message: {
      name: 'message',
      conditions: {
        matches: {
          name: 'matches'
        },
        contains: {
          name: 'contains'
        }
      }
    }
  },
  outgoingActions: {
    postMessage: {
      name: 'post_message',
      description: 'Post a message to a channel',
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
