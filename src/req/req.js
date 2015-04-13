


var req = module.exports = {};

req.local = function (path)
{
	return require(__dirname + '/../../node_modules/' + path);
}


req.inRepl = function (repl)
{
	req.patch(repl.context.module);
}

var
	resolve = require('path').resolve,
	paths   = require('module')._nodeModulePaths;

req.patch = function (module)
{
	/* @todo: check empty resolve */
	// cmodule.filename = resolve('file');
	module.filename = resolve();
	module.paths    = paths(module.filename);
}


/* patch-in */
var parse = require('./parse'); parse.patch(req.patch);

req.parse = function (seq)
{
	return seq.map(parse.build);
}

req.process = function (mods, console)
{
	mods = mods.map(parse.attempt);
	mods = mods.map(parse.canonize);

	mods.forEach(parse.report(console));

	return mods;
}

req.extend = function (repl, mods)
{
	var context = repl.context;

	mods.forEach(function (item)
	{
		if (item.error) return;

		context[item.alias] = item.mod;
	});
}
