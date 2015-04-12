


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

req.process = function (argopts, console)
{
	var mods = argopts._;

	mods = mods.map(parse.build);
	mods = mods.map(parse.attempt);

	mods.forEach(function (item)
	{
		if (item.error)
		{
			console.error(item.error, item.input);
		}
		else
		{
			console.info(item.alias, typeof item.mod);
		}
	});

	return mods;
}

req.extend = function (repl, mods)
{

}
