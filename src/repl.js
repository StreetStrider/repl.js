

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
	manifest = require('../package.json'),
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
		string:
		[
			'eval'
		],
		alias:
		{
			eval: [ 'e' ],
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
		process.stdout.write(manifest.version + '\n');
		process.exit();
	}

	var
		mods = req.parse(argopts._),
		replopts = { argopts: argopts, mods: mods };

	if (argopts.eval)
	{
		var evalstring = argopts.eval;
		replopts.instantRun = { eval: evalstring };
	}

	return repl.start(replopts);
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

	instance.writer = utilrepl.dir.writer(console);

	reset(context);
	instance.on('reset', reset);

	if (options.instantRun)
	{
		var instarun = require('./evaler/instarun');
		instarun(instance, console, options.instantRun);
	}

	return instance;

	/* @todo: check reset in other versions */
	function reset (context)
	{
		if (! argopts.clean)
		{
			utilrepl.console.inRepl(instance, console);

			utilrepl.log(instance, console);

			context.dir = utilrepl.dir.dir(instance, console);

			utilrepl.sg(instance, console);

			utilrepl.aux(instance);

			context.colors = colors;

			context.Promise = require('promise');

			context.manifest = manifest;
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
