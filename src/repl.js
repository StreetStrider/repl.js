

var repl = module.exports = {};

var
	std = require('repl');

var
	extend  = require('aux.js/object/extend');

var
	uconsole = require('./console'),
	dir = require('./dir');

repl.start = function ()
{
	var instance = std.start({
		prompt: 'js > ',
		ignoreUndefined: true
	});

	var context = instance.context;

	reset(context);
	instance.on('reset', reset);

	function reset (context)
	{
		uconsole(instance);

		instance.writer = context.dir = dir(instance);
	}

	return instance;
}
