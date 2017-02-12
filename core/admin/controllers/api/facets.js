import resource from 'resource-router-middleware'
import facetsModel from '../../../models/facets'

const facetsRoute = () => resource({
	/** Property name to store preloaded entity on `request`. */
	id: 'facet',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		const facet = facetsModel.find(curFacet => curFacet.id === id)
		const err = facet ? null : 'Not found'
		callback(err, facet)
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(facetsModel)
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = facetsModel.length.toString(36)
		facetsModel.push(body)
		res.json(body)
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet)
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		Object.keys(body).forEach((key) => {
			if (key !== 'id') {
				facet[key] = body[key]
			}
		})
		res.sendStatus(204)
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		facetsModel.splice(facetsModel.indexOf(facet), 1)
		res.sendStatus(204)
	},
})

export default facetsRoute
