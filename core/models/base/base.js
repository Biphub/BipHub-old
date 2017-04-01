import _ from 'lodash'
import db from '../../bookshelf'

const base = db.bookshelf.Model.extend({
  hasTimestamps: ['created_at', 'updated_at'],

}, {
  /**
   * Strip unnecessary fields
   * @param attrs
   * @returns {*}
   */
  parse(attrs) {
    return _.pick(attrs, this.attributes)
  },
  /**
   * Stringify any JSON or Array columns
   * @param attrs
   * @returns {*}
   */
  formatJson(attrs) {
    _.forOwn(attrs, (val, key) => {
      const current = attrs[key]
      if (_.isArray(current) || _.isPlainObject(current)) {
        attrs[key] = JSON.stringify(current)
      }
    })
    return attrs
  },
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
    const parsedData = this.parse(data)
    const jsonFormatted = this.formatJson(parsedData)
    return this.forge(jsonFormatted).save(null, options)
  },
  /**
   * Find a model based on it's ID
   * @param {String} id The model's ID
   * @param {Object} [options] Options used of model.fetch
   * @returns {*|Promise.<Model|null>}
   */
  findById(id, options) {
    return this.findOne({ [this.prototype.idAttribute]: id }, options)
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
