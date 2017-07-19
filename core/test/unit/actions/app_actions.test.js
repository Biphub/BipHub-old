/* global describe it beforeEach */
import assert from 'assert'
import bookshelf from '../../../bookshelf'

require('babel-register')
require('babel-polyfill')

describe('App actions', () => {
  describe('#indexOf()', () => {
    beforeEach((done) => {
      console.log('before migration')
      bookshelf.migrate().then(() => done())
      console.log('checking migration!')
    })
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4))
    })
  })
})
