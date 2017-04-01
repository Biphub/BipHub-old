import _ from 'lodash'

const flatForOwn = (collection) => {
  const resultArray = []
  _.forOwn(collection, (val) => {
    resultArray.push(val)
  })
  return resultArray
}

export default {
  flatForOwn,
}
