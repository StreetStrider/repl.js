


var
	path      = require('path'),
	vm        = require('vm'),
	repl      = require('repl'),

	_         = require('lodash'),
	clc       = require('cli-color'),
	YAML      = require('yamljs'),

	parseArgs = require('./parseArgs'),
	evaler    = require('./evaler').evaler,
	writer    = require('./writer'),
	functools = require('./functools'),
	Console   = require('str-console').Console;

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
			process: process,
			module: module,
			require: require
		});

		context.global = context;

		extendContext = _extendContext(false, context);
	}

	extendContext(functools);
	extendContext(parseArgs(modulePairs));

	var instance = repl.start(options);

	instance.context = context;
	instance.context.instance = instance;

	var _console = new Console(
		instance.outputStream, // stdout
		instance.outputStream, // stderr
		instance.context.global);

	extendContext({
		console: _console,

		keys: Object.keys,

		L: _,
		clc:  clc,
		YAML: YAML,

		log: _console.log,
		dir: _console.dir,
		dir$: _console.dir$
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
