

var repl = module.exports = {};

var
	std = require('repl');

var
	extend  = require('aux.js/object/extend'),
	Console = require('console-ultimate');

repl.start = function ()
{
	var instance = std.start({
		prompt: 'js > ',
		useGlobal: true,
		ignoreUndefined: true
	});

	var context = instance.context;

	var output = instance.outputStream;
	var uconsole = Console(output, output);

	require('console-ultimate/global').replaceAt(context, uconsole);

	return instance;
}

repl.start();
