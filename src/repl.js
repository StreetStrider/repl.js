

var repl = module.exports = {};

var
	req = require('./req');

var
	std = require('repl');

var
	extend  = req.local('aux.js/object/extend');

var
	uconsole = require('./console'),
	log = require('./log'),
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

	/* @todo: check reset in other versions */
	function reset (context)
	{
		uconsole(instance);

		log(instance);

		/* @todo: return value issue */
		/*instance.writer = */ context.dir = dir(instance);
	}

	return instance;
}
