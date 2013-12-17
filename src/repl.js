


var
	vm        = require('vm'),
	repl      = require('repl'),

	_         = require('lodash'),

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

	var context = vm.createContext({
		console: console,

		log: console.log,
		dir: console.dir,
		dir$: function (obj) { console.dir(obj, Infinity); },
		keys: Object.keys,

		L: _,
		clc: require('cli-color'),
		YAML: require('yamljs')
	});

	_.extend(context, functools);
	_.extend(context, parseArgs(modules));

	var instance = repl.start({
		prompt: 'js > ',
		ignoreUndefined: true,
		// useGlobal: false,
		eval: evaler,
		writer: writer
	});

	instance.context = context;

	return instance;
}
