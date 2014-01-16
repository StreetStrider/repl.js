


var
	vm        = require('vm'),
	repl      = require('repl'),
	path      = require('path'),

	_         = require('lodash'),

	parseArgs = require('./parseArgs'),
	evaler    = require('./evaler').evaler,
	writer    = require('./writer'),
	functools = require('./functools'),
	Console   = require('./console');

module.exports =
{
	start: start
};

function start (modules)
{
	modules || (modules = []);

	module.filename = path.resolve('repl');
	module.paths = require('module')._nodeModulePaths(module.filename);

	var context = vm.createContext({
		process: process,
		module: module,
		require: require,

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
	instance.context.repl = instance;

	var console = new Console(instance.outputStream, instance.outputStream, context);

	_.extend(context,
	{
		global: context,
		console: console,

		log: console.log,
		dir: console.dir,
		dir$: console.dir$
	});

	return instance;
}
