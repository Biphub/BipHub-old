import bookshelf from '../../../bookshelf'

const base = bookshelf.Model.extend({
  hasTimestamps: ['created_at', 'updated_at'],
}, {
  findAll(filter, options) {
    return this.forge().where(filter).fetchAll(options)
  },

  findOne(query, options) {
    return this.forge(query).fetch(options)
  },

  create(data, options) {
    return this.forge(data).save(null, options)
  },

  update(data) {
    console.log('updated received payload ', data)
    return this.forge(data).save(null, { method: 'update' })
  },
})

export default base
