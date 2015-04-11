

var
	local = require('../req').local,

	cat     = local('aux.js/array/cat');
	partial = local('aux.js/fn/partial');

module.exports = function (repl)
{
	var
		context = repl.context,
		clog    = context.console.log.bind(context.console);

	context.log = function log ()
	{
		return clog.apply(null, arguments);
	}

	context.plog = function partialLog ()
	{
		return partial.apply(null, cat([ clog ], arguments));
	}
}
