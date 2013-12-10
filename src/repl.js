


var
	modules   = process.argv.slice(2),

	repl      = require('repl'),

	parseArgs = require('./parseArgs'),
	evaler    = require('./evaler').evaler,
	writer    = require('./writer'),
	functools = require('./functools'),
	console   = require('./console');

global.log  = console.log;
global.dir  = console.dir;
global.keys = Object.keys;

global.L    = require('lodash');
global.clc  = require('cli-color');
global.YAML = require('yamljs');

L.extend (global, functools);
parseArgs(global, modules);

global.repl = repl.start({
	prompt: 'js > ',
	ignoreUndefined: true,
	useGlobal: true,
	eval: evaler,
	writer: writer
});
