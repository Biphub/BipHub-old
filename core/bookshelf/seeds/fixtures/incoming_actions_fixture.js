exports.default = [
	{ id: 1, type: 'webhook/ws', conditions: '["matches","contains"]', name: 'message', app_id: 1 },
	{ id: 2, type: 'webhook/ws', conditions: null, name: 'account_changed', app_id: 2 },
	{ id: 3, type: 'webhook/ws', conditions: null, name: 'bot_changed', app_id: 2 },
	{ id: 4, type: 'webhook/ws', conditions: '["matches","contains"]',	name: 'message', app_id: 2 }
];
