

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
	evaler = require('./evaler'),
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

	var mods = req.parse(argopts._);

	return repl.start({ argopts: argopts, mods: mods });
}

repl.start = function (options)
{
	options || (options = {});

	options = extend(
		{},
		defaults,
		options
	);

	var
		argopts = options.argopts,
		console = utilrepl.console.Console(options),
		mods    = req.process(options.mods, console);

	/* @todo override? */
	options.eval = evaler(options, console)

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

			utilrepl.log(instance, console);

			/* @todo: return value issue */
			/*instance.writer = */ context.dir = utilrepl.dir(instance, console);

			utilrepl.sg(instance, console);

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

	argopts: {},
	mods: []
}
