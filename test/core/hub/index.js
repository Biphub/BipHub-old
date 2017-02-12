import { assert } from 'chai'

describe('Hub funcationality testing', () => {
	it('should be ok', (done) => {
		const user = {
			age: 2
		}
		assert.equal(user.age, 3, 'not equal!')
		done()
	})
})
