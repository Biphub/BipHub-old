/* global describe it */
import assert from 'assert'
import root from '../../../helpers/root'

describe('Root', () => {
  describe('global', () => {
    it('Should be ', () => {
      assert.equal(global, root)
    })
  })
})
