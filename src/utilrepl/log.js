

var
	local = require('../req').local,

	cat     = local('aux.js/array/cat');
	partial = local('aux.js/fn/partial');

module.exports = function (repl, console)
{
	var context = repl.context;

	context.log = console.log;
	context.logpart = context.plog = console.log.part;
}
