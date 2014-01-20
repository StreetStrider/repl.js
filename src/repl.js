


var
	vm        = require('vm'),
	repl      = require('repl'),
	path      = require('path'),

	_         = require('lodash'),

	parseArgs = require('./parseArgs'),
	evaler    = require('./evaler').evaler,
	writer    = require('./writer'),
	functools = require('./functools'),
	_console  = require('str-console');

module.exports =
{
	run:   run,
	start: start
};

function run (argv)
{
	return start({}, argv);
}

function start (options, modulePairs)
{
	options     || (options = {});
	modulePairs || (modulePairs = []);

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
	_.extend(context, parseArgs(modulePairs));

	var instance = repl.start(_.extend(
	{},
	{
		prompt: 'js > ',
		ignoreUndefined: true,

		eval: evaler,
		writer: writer
	},
	options,
	{
		useGlobal: false,
	}));

	instance.context = context;
	instance.context.repl = instance;

	var console = new _console.Console(instance.outputStream, instance.outputStream, context);

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
