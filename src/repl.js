

var repl = module.exports = {};

var
	std = require('repl');

var
	extend  = require('aux.js/object/extend');

var
	uconsole = require('./console');

repl.start = function ()
{
	var instance = std.start({
		prompt: 'js > ',
		useGlobal: true,
		ignoreUndefined: true
	});

	var context = instance.context;

	uconsole(instance);

	return instance;
}
