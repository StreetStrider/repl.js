


var
	modules   = process.argv.slice(2),

	repl      = require('repl'),

	parseArgs = require('./parseArgs'),
	writer    = require('./writer'),
	console   = require('./console');

global.log  = console.log;
global.dir  = console.dir;
global.keys = Object.keys;

global.L    = require('lodash');
global.clc  = require('cli-color');

L.extend (global, require('./functools'));
parseArgs(global, modules);

global.repl = repl.start({
	prompt: 'js > ',
	ignoreUndefined: true,
	useGlobal: true,
	writer: writer
});
