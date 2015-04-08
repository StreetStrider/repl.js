

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
		useGlobal: true,
		ignoreUndefined: true
	});

	var context = instance.context;

	uconsole(instance);

	instance.writer = context.dir = dir(instance);

	return instance;
}
