const internalLookup = require('./internalPostcodeLookup')
// JHS 071119 remove free lookup
// const freeLookup = require('./freePostcodeLookup')
const {isUndefined, isNull, map, chain} = require('lodash')

module.exports = function (postcode) {
//  const addressLookup = isUndefined(internalLookup.token()) ? freeLookup : internalLookup
  const addressLookup = internalLookup
  return addressLookup.lookup(postcode)
    .then(addresses => map(addresses, addressArray => chain(addressArray)
      .filter(line => (!isUndefined(line) && !isNull(line) && (line.length > 0)))
      .join(', ')
      .value()))
}
