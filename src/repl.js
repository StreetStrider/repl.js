


var
	vm        = require('vm'),
	repl      = require('repl'),

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

	var context = vm.createContext({
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
		console: console,

		log: console.log,
		dir: console.dir,
		dir$: console.dir$
	});

	return instance;
}
