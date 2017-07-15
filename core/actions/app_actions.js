import models from '../models'

/**
 * Register app action
 * @param payload
 * @returns {Promise.<*|Promise.<*>|Promise.<boolean>>}
 */
async function registerApp (payload) {
  const app = await models.App.createOne(payload)
  console.log('registered an app!')
  return app
}

export default {
  registerApp
}
