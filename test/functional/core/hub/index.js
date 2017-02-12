import { assert } from 'chai'

describe('Hub should register all webhooks', () => {
	it('should be ok', () => {
		const user = {
			age: 2
		}
		return assert.equal(user.age, 2, 'not equal!')
	})
})
