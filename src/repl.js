


var
	modules   = process.argv.slice(2),

	repl      = require('repl'),

	parseArgs = require('./parseArgs'),
	console   = require('./console');

global.log  = console.log;
global.dir  = console.dir;
global.keys = Object.keys;

global.L    = require('lodash');
global.clc  = require('cli-color');

L.extend (global, require('./functools'));
parseArgs(global, modules);

instance = repl.start({
	prompt: 'js > ',
	ignoreUndefined: true,
	useGlobal: true
});
