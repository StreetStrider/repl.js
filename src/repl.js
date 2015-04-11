

var repl = module.exports = {};

var
	req = require('./req');

var
	path = require('path'),
	std  = require('repl');

var
	extend   = req.local('aux.js/object/extend'),
	colors   = req.local('cli-color'),
	minimist = req.local('minimist');

var
	utilrepl = require('./utilrepl');


repl.run = function (argv)
{
	argv = minimist(argv);

	return repl.start({ argopts: argv });
}

repl.start = function (options)
{
	options = extend({}, defaults, options || {});

	var console = utilrepl.console.Console(options);

	var
		instance = std.start(options),
		context  = instance.context;

	var argopts = options.argopts;
	if (! argopts.clean)
	{
		reset(context);
		instance.on('reset', reset);
	}

	return instance;

	/* @todo: check reset in other versions */
	function reset (context)
	{
		utilrepl.console.inRepl(instance, console);

		utilrepl.log(instance);

		/* @todo: return value issue */
		/*instance.writer = */ context.dir = utilrepl.dir(instance);

		utilrepl.sg(instance);

		utilrepl.aux(instance);

		context.colors = colors;

		req.inRepl(instance);
	}
}

var defaults =
{
	prompt: 'js > ',
	ignoreUndefined: true,

	argopts: {}
}
