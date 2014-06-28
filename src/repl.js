


var
	path      = require('path'),
	vm        = require('vm'),
	repl      = require('repl'),

	_         = require('lodash'),
	Q         = require('bluebird'),
	clc       = require('cli-color'),
	YAML      = require('yamljs'),

	version   = require('../package.json').version,
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
		useGlobal = options.useGlobal = !! options.useGlobal,
		extendContext;

	if (useGlobal)
	{
		context = global;
		extendContext = _extendContext(global);
	}
	else
	{
		var context = vm.createContext({});
		extendContext = _extendContext(context);

		extendContext(global);
		context.global = context;
	}

	extendContext(functools);
	extendContext(parseArgs(modulePairs));

	var instance = repl.start(options);

	instance.context = context;
	instance.context.instance = instance;

	instance.version = version;

	var _console = new Console(
		instance.outputStream, // stdout
		instance.outputStream, // stderr
		instance.context.global
	);

	extendContext({
		console: _console,
		require: require,

		L: _,
		Q: Q,
		clc:  clc,
		YAML: YAML,

		log:  _console.log,
		dir:  _console.dir,
		dir$: _console.dir$
	});

	return instance;
}

function _extendContext (context)
{
	return function extendContext (object)
	{
		_.extend(context, object);
	};
}
