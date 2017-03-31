import db from '../../bookshelf'

const base = db.bookshelf.Model.extend({
  hasTimestamps: ['created_at', 'updated_at'],
}, {
	/**
   * It will ensure bookshelf fetches full entity according to
   * related:[] defined in extending entity constructor
   * http://stackoverflow.com/questions/35679855/always-fetch-from-related-models-in-bookshelf-js
	 * @param query
	 * @returns {*|Promise.<Model|null>}
	 */
  fetchFull(query) {
    let args
    if (this.constructor.withRelated) {
      args = { withRelated: this.constructor.withRelated }
    }
    return this.forge(query).fetch(args)
  },
	/**
   * Find all entities that matches the given filter
	 * @param filter
	 * @param options
	 * @returns {*|Promise.<Collection>}
	 */
  findAll(filter, options) {
    return this.forge().where(filter).fetchAll(options)
  },
	/**
   * Find one entity
	 * @param query
	 * @param options
	 * @returns {*|Promise.<Model|null>}
	 */
  findOne(query, options) {
    return this.forge(query).fetch(options)
  },
	/**
   * Creates one entity
	 * @param data
	 * @param options
	 * @returns {*}
	 */
  create(data, options) {
    return this.forge(data).save(null, options)
  },
	/**
   * Updates one entity
	 * @param data
	 * @returns {*}
	 */
  update(data) {
    return this.forge(data).save(null, { method: 'update' })
  },
})

export default base
