


var
	repl      = require('repl'),

	parseArgs = require('./parseArgs'),
	evaler    = require('./evaler').evaler,
	writer    = require('./writer'),
	functools = require('./functools'),
	console   = require('./console'); /* careful */

module.exports =
{
	start: start
};

function start (modules)
{
	modules || (modules = []);

	global.log  = console.log;
	global.dir  = console.dir;
	global.dir$ = function (obj) { global.dir(obj, Infinity); };
	global.keys = Object.keys;

	global.L    = require('lodash');
	global.clc  = require('cli-color');
	global.YAML = require('yamljs');

	L.extend(global, functools);
	L.extend(global, parseArgs(modules));

	return repl.start({
		prompt: 'js > ',
		ignoreUndefined: true,
		useGlobal: true,
		eval: evaler,
		writer: writer
	});
}
