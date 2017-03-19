import Q from 'q'
import appFixture from './fixtures/apps_fixture'
import bipFixture from './fixtures/bips_fixture'
import incomingFixture from './fixtures/incoming_actions_fixture'
import single from '../../models/single'
import root from '../../helpers/root'

const seedDB = () => {
  if (typeof root.seedFinished !== 'undefined') { return false }
  const forgedSeeds = []
  appFixture.forEach((fixture) => {
    forgedSeeds.push(single.App.create(fixture, null))
  })
  bipFixture.forEach((fixture) => {
    forgedSeeds.push(single.Bip.create(fixture, null))
  })
  incomingFixture.forEach((fixture) => {
    forgedSeeds.push(single.IncomingAction.create(fixture, null))
  })
  Q.allSettled(forgedSeeds)
  root.seedFinished = true
  return true
}

export default {
  seedDB,
}
