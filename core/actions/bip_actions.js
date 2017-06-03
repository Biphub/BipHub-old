import R from 'ramda'
import Fantasy from 'ramda-fantasy'
import models from '../models'
import pubsub from '../pubsub'
const Future = Fantasy.Future

function checkBipCondition ({appName, actionName, condName, actionPayload, socket}) {
  return new Future((rej, res) => {
    const checkIncActionMessageName = `${appName}_${actionName}_${condName}`
    console.log('invoking future BipCondition app name ', appName, '  actionName ', actionName, ' condname ', condName, '  actionPayload ', actionPayload)
    pubsub.publish({
      action: checkIncActionMessageName,
      data: actionPayload,
      socket
    }).then((result) => res(result))
      .catch((error) => rej(error))
  })
}

function getConditionCheckedBips ({ app, payloadData, bips, socket, conditionCheckArgs }) {
  return new Future((rej, res) => {
    console.log('checking bip conds args ', conditionCheckArgs)
    const checkBipsConditions = R.traverse(Future.of, checkBipCondition, conditionCheckArgs)
    console.log('checking bip conds')
    checkBipsConditions.fork(console.error, console.log)
    res(true)
  })
}

function getBipsCheckConditionArgs ({ app, payloadData, bips, socket }) {
  return new Future((rej, res) => {
    const getBipCheckArgs = R.map((bip) => {
      const getConds = R.compose(
        conds => JSON.parse(conds),
        bip => R.prop('incoming_action_condition_names')(bip)
      )
      const constructArgs = R.compose(
        conds => R.map(cond => ({
          appName: app.get('name'),
          actionName: R.prop('incoming_action_name', bip),
          condName: cond,
          actionPayload: payloadData,
          socket
        }))(conds)
      )

      return R.compose(
        constructArgs,
        getConds
      )(bip)
    })
    const getSpreadBipCheckArgs = R.compose(
      jsonBips => getBipCheckArgs(jsonBips)[0], // Unwraps a layer of array
      bips => bips.toJSON()
    )
    return res({ app, payloadData, bips, socket, conditionCheckArgs: getSpreadBipCheckArgs(bips) })
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
    R.chain(getBipsCheckConditionArgs),
    R.chain(getBips),
    R.chain(getIncActionsFromApp),
    getAppByName
  )
  getApp({ appName, payload, socket }).fork(console.error, console.log)
}

export default {
  bip
}
