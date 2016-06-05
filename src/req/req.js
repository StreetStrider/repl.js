
var parse = require('./parse')

var req = module.exports = {};

req.inRepl = function (repl)
{
	var context = repl.context

	var module = parse.Module()

	// req.patch(context.module)
	context.module  = module
	context.require = module.require
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


req.parse = function (seq)
{
	return seq
	.map(String)
	.map(parse.build);
}

var Attempter = parse.Attempter

req.process = function (mods, console)
{
	var attempter = Attempter()

	mods = mods.map(attempter);
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
