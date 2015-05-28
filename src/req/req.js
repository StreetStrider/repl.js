


var req = module.exports = {};

req.local = function (path)
{
	return require(__dirname + '/../../node_modules/' + path);
}


req.inRepl = function (repl)
{
	req.patch(repl.context.module);
}

req.patchForFile = function (context, filename, done)
{
	var module = context.module;

	var prev =
	{
		filename: module.filename,
		exports:  module.exports
	}

	req.patch(module, filename);

	module.exports  = {};
	context.exports = {};

	return function ()
	{
		req.patch(module, prev.filename);
		module.exports = prev.exports;

		done();
	}
}

var
	resolve = require('path').resolve,
	paths   = require('module')._nodeModulePaths;

req.patch = function (module, filename)
{
	filename || (filename = '');

	module.filename = resolve(filename);
	module.paths    = paths(module.filename);
}

/* patches target MODULE environment for proper requiring modules on-fly */
var parse = require('./parse'); parse.patchSelf(req.patch);

req.parse = function (seq)
{
	return seq
	.map(String)
	.map(parse.build);
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
