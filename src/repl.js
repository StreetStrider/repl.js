

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
	var argopts = minimist(argv, {
		boolean:
		[
			'clean',
			'help',
			'version'
		],
		alias:
		{
			help: [ 'h', '?' ],
			version: [ 'v' ],
		}
	});

	if (argopts.help)
	{
		process.stdout.write(require('./help'));
		process.exit();
	}

	if (argopts.version)
	{
		process.stdout.write(require('../package.json').version + '\n');
		process.exit();
	}

	return repl.start({ argopts: argopts });
}

repl.start = function (options)
{
	options = extend({}, defaults, options || {});

	var
		argopts = options.argopts,
		console = utilrepl.console.Console(options),
		mods = req.process(argopts, console);

	var
		instance = std.start(options),
		context  = instance.context;

	reset(context);
	instance.on('reset', reset);

	return instance;

	/* @todo: check reset in other versions */
	function reset (context)
	{
		if (! argopts.clean)
		{
			utilrepl.console.inRepl(instance, console);

			utilrepl.log(instance);

			/* @todo: return value issue */
			/*instance.writer = */ context.dir = utilrepl.dir(instance);

			utilrepl.sg(instance);

			utilrepl.aux(instance);

			context.colors = colors;
		}

		req.inRepl(instance);
		req.extend(instance, mods);
	}
}

var defaults =
{
	prompt: 'js > ',
	ignoreUndefined: true,

	argopts: {}
}
