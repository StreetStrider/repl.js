

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
	uconsole = require('./console'),
	log = require('./log'),
	dir = require('./dir'),
	sg  = require('./sg'),
	aux = require('./aux');

repl.run = function (argv)
{
	argv = minimist(argv);

	return repl.start({ argopts: argv });
}

repl.start = function (options)
{
	options = extend({}, defaults, options || {});

	var argopts = options.argopts;

	var instance = std.start(options);

	var context = instance.context;

	if (! argopts.clean)
	{
		reset(context);
		instance.on('reset', reset);
	}

	/* @todo: check reset in other versions */
	function reset (context)
	{
		uconsole(instance);

		log(instance);

		/* @todo: return value issue */
		/*instance.writer = */ context.dir = dir(instance);

		sg(instance);

		aux(instance);

		context.colors = colors;

		req.inRepl(instance);
	}

	return instance;
}

var defaults =
{
	prompt: 'js > ',
	ignoreUndefined: true,

	argopts: {}
}
