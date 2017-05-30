import R from 'ramda'
import Fantasy from 'ramda-fantasy'
import models from '../models'
import pubsub from '../pubsub'
const Future = Fantasy.Future

function checkActionCondition (appName, actionName, condName, actionPayload, socket) {
  return new Future((rej, res) => {
    const checkIncActionMessageName = `${appName}_${actionName}_${condName}`
    pubsub.publish({
      action: checkIncActionMessageName,
      data: actionPayload,
      socket
    }).then((result) => res(result))
      .catch((error) => rej(error))
  })
}

function getAppByName (appName) {
  return new Future((rej, res) => {
    models.App.findOne({name: appName}, {withRelated: ['actions']})
      .then(model => {
        if (model) {
          return res(model)
        }
        return rej(model)
      })
  })
}

function getIncActionsFromApp (incActionName, app) {
  return new Future((rej, res) => {
    const relatedActions = app.related('actions')
      .where({
        name: incActionName,
        app_id: app.get('id'),
        type: 'incomingActions'
      })
    if (relatedActions) {
      return res(relatedActions)
    }
    return rej(relatedActions)
  })
}

/**
 * Base bip action that reacts to incoming event and forward it to outgoing action
 * @param appName
 * @param payload
 * @param socket
 * @returns {Promise.<void>}
 */
function bip (appName, payload, socket) {
  const { meta, data } = payload
  const incActionName = meta.name
  const getApp = R.compose(
    R.chain(R.curry(getIncActionsFromApp)(incActionName)),
    getAppByName
  )
  getApp(appName).fork(console.error, console.log)
 /* const { meta, data } = payload
  const incActionName = meta.name
  const app = await models.App
    .findOne({
      name: appName
    }, {
      withRelated: ['actions']
    })
  const incomingActions = await app.related('actions')
    .where({
      name: incActionName,
      app_id: app.get('id'),
      type: 'incomingActions'
    })
  const firstIncActionName = R.head(incomingActions).get('name')
  const bips = (
    await models.Bip
    .findAll({
      incoming_action_name: firstIncActionName,
      incoming_app_name: app.get('name')
    })
  ).models
  const bipActions = R.map(x => {
    const bipModel = x.toJSON()
    const checkConditions = R.compose(
      R.map(condName => checkActionCondition(appName, incActionName, condName, data, socket)),
      names => JSON.parse(names)
    )
    return checkConditions(bipModel.incoming_action_condition_names)
  })(bips)*/
}

export default {
  bip
}
