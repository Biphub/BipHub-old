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

function getConditionCheckedBips ({ app, payloadData, bips, socket }) {
  return new Future((rej, res) => {
    const getBipCheckArgs = R.map((bip) => {
      const getConds = R.compose(
        conds => JSON.parse(conds),
        bip => R.prop('incoming_action_condition_names')(bip)
      )
      const constructArgs = R.compose(
        conds => R.map(cond => [
          app.get('name'),
          R.prop('incoming_action_name', bip),
          cond,
          payloadData,
          socket
        ])(conds)
      )
      return constructArgs(getConds(bip))
    })
    const getSpreadBipCheckArgs = R.compose(
      jsonBips => getBipCheckArgs(jsonBips)[0], // Unwraps a layer of array
      bips => bips.toJSON()
    )
    return res(getSpreadBipCheckArgs(bips))
  })
}

function getBips ({ app, payloadData, incomingAction, socket }) {
  return new Future((rej, res) => {
    models.Bip
      .findAll({ incoming_action_name: incomingAction.get('name'), incoming_app_name: app.get('name') })
      .then(bips => {
        if (bips) {
          return res({ app, payloadData, bips, socket })
        }
        return rej(undefined)
      })
  })
}

function getIncActionsFromApp ({ app, payload, socket }) {
  return new Future((rej, res) => {
    const { meta, data } = payload
    const incActionName = meta.name
    const relatedActions = app.related('actions')
      .where({
        name: incActionName,
        app_id: app.get('id'),
        type: 'incomingActions'
      })
    if (relatedActions) {
      return res({
        app,
        payloadData: data,
        incomingAction: R.head(relatedActions),
        socket
      })
    }
    return rej(undefined)
  })
}

function getAppByName ({ appName, payload, socket }) {
  return new Future((rej, res) => {
    models.App.findOne({name: appName}, {withRelated: ['actions']})
      .then(app => {
        if (app) {
          return res({ app, payload, socket })
        }
        return rej(undefined)
      })
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
  const getApp = R.compose(
    R.chain(getConditionCheckedBips),
    R.chain(getBips),
    R.chain(getIncActionsFromApp),
    getAppByName
  )
  getApp({ appName, payload, socket }).fork(console.error, console.log)
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
  })(bips) */
}

export default {
  bip
}
