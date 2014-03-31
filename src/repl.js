


var
	path      = require('path'),
	vm        = require('vm'),
	repl      = require('repl'),

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
	options = _.extend(
		{},
		{
			prompt: 'js > ',
			ignoreUndefined: true,

			eval: evaler,
			writer: writer,

			useGlobal: false
		},
		options || {}
	);

	modulePairs || (modulePairs = []);

	module.filename = path.resolve('repl');
	module.paths = require('module')._nodeModulePaths(module.filename);

	var
		useGlobal = !! options.useGlobal,
		extendContext;

	if (useGlobal)
	{
		extendContext = _extendContext();
	}
	else
	{
		var context = vm.createContext({
			global: context,
			process: process,
			module: module,
			require: require
		});

		extendContext = _extendContext(true, context);
	}



	extendContext(functools);
	extendContext(parseArgs(modulePairs));

	var instance = repl.start(options);

	instance.context = context;
	instance.context.repl = instance;

	var console = new _console.Console(
		instance.outputStream, // stdout
		instance.outputStream, // stderr
		instance.context.global);

	extendContext({
		console: console,

		keys: Object.keys,

		L: _,
		clc: require('cli-color'),
		YAML: require('yamljs')

		log: console.log,
		dir: console.dir,
		dir$: console.dir$
	});

	return instance;
}

function _extendContext (useGlobal, context)
{
	if (! useGlobal)
	{
		return function (object)
		{
			_.extend(context, object);
		};
	}
	else
	{
		return function (object)
		{
			_.extend(global, object);
		};
	}
}
