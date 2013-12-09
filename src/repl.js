


var
	modules   = process.argv.slice(2),

	repl      = require('repl'),

	parseArgs = require('./parseArgs'),
	console   = require('./console'),

	context   = {};

parseArgs(context, modules);

instance = repl.start({
	prompt: 'js > ',
	ignoreUndefined: true,
	useGlobal: true
});

for (var key in context) if (context.hasOwnProperty(key))
{
	global[key] = context[key];
}

global.dir = console.dir;
global.L   = require('lodash');
