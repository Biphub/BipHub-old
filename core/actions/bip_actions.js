import R from 'ramda'
import Fantasy from 'ramda-fantasy'
import models from '../models'
import pubsub from '../pubsub'
import logger from '../logger'
const Future = Fantasy.Future


function forwardBip ({ app, payloadData, bip, socket, currentActionChain }) {
  return new Future((rej, res) => {
    const actionName = `${currentActionChain.app_name}_${currentActionChain.action_name}`
    logger.log('action name created! ', actionName)
    return res(actionName)
  })
}

function forwardAllBips ({ app, payloadData, bips, socket }) {
  return new Future((rej, res) => {
  })
}

function checkBipCondition ({appName, actionName, condName, condTestCase, actionPayload, socket}) {
  return new Future((rej, res) => {
    const checkIncActionMessageName = `${appName}_${actionName}_${condName}`
    const payload = {
      data: actionPayload,
      testCase: condTestCase
    }
    pubsub.publish({
      action: checkIncActionMessageName,
      data: payload,
      socket
    }).then((result) => {
      logger.info('condition test received a result! ', result)
      return res(result)
    })
    .catch((error) => {
      logger.error('condition test received an error! ', error)
      return rej(error)
    })
  })
}

/**
 * Filter and retrieve checked bips only
 * @param app
 * @param payloadData
 * @param bips
 * @param socket
 * @param conditionCheckArgs
 * @returns {*}
 */
function getConditionCheckedBips ({ app, payloadData, bips, socket, conditionCheckArgs }) {
  return new Future((rej, res) => {
    const checkBipsConditions = R.traverse(Future.of, checkBipCondition, conditionCheckArgs)
    checkBipsConditions.fork((err) => {
      logger.error('error while checking conditions ', err)
      return rej(err)
    }, (resultArray) => {
      // resultArray = [true, false, true] : contains results of bips condition check
      const filterIndexed = R.addIndex(R.filter)
      const filterBips = filterIndexed((bip, idx) => resultArray[idx])
      return res({
        app,
        payloadData,
        bips: filterBips(bips),
        socket
      })
    })
  })
}

function getBipsCheckConditionArgs ({ app, payloadData, bips, socket }) {
  return new Future((rej, res) => {
    const getBipCheckArgs = R.map((bip) => {
      const getConds = R.compose(
        conds => JSON.parse(conds),
        bip => R.prop('incoming_action_condition_names')(bip)
      )
      const constructArgs = R.map(cond => ({
        appName: app.get('name'),
        actionName: R.prop('incoming_action_name', bip),
        condName: R.prop('name', cond),
        condTestCase: R.prop('testCase', cond),
        actionPayload: payloadData,
        socket
      }))
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
  getApp({ appName, payload, socket }).fork(logger.error, logger.log)
}

export default {
  bip
}
