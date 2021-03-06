/**
 * Run test specs in node environment
 * Usage:
 *   $ cd seajs
 *   $ node tests/runner-node.js
 */

require('../lib/sea')

define('./tests/node-runner', function(require) {
  var test = require('./test')

  var suites = require('./meta').map(function(suite) {
    return './' + suite + '/meta'
  })

  require.async(suites, function() {
    var args = [].slice.call(arguments)
    var specs = []

    args.forEach(function(meta, i) {
      specs = specs.concat(meta.map(function(spec) {
        return suites[i].split('/')[2] + '/' + spec
      }))
    })
    //console.log(specs)

    // go
    test.run(specs)
  })

})

seajs.use('./tests/node-runner')

