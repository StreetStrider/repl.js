/*
 * name
 * path
 * alias=name
 * alias=path
 */

var
	Path    = require('path'),
	console = require('str-console');

module.filename = Path.resolve('parseArgs');
module.paths = require('module')._nodeModulePaths(module.filename);

module.exports = function parseArgs (modules)
{
	var context = {};

	modules.forEach(function (module)
	{
		var pair, alias, path, mod, realpath;

		pair = tryPair(module);
		if (! pair) return;

		alias = pair[0];
		path  = pair[1];

		pair = tryModule(path);
		if (! pair) return;

		mod = pair[0];
		realpath = pair[1];

		console.info('Loaded `'+ path +'`('+ realpath +') as `'+ alias +'`.');
		context[alias] = mod;
	});

	return context;
};

function tryPair (module)
{
	var alias, path;
	if (~ module.indexOf('='))
	{
		var match;
		if (match = module.match(/^([^=]+)=(.+)$/))
		{
			alias = match[1];
			path  = match[2];
		}
		else
		{
			console.error('Cannot interpet input `'+ module +'`.');
			return;
		}
	}
	else
	{
		alias = module;
		path  = module;
	}

	var s_alias = simplify(alias);
	if (! s_alias)
	{
		console.error('Cannot create variable for `'+ alias + '`.');
		return;
	}

	return [ s_alias, path ];
}

function tryModule (path)
{
	var _path = path;

	/* as module name */
	try
	{
		return [ require(path), path ];
	}
	catch (e) {}

	/* as path */
	path = Path.resolve(path);
	try
	{
		return [ require(path), path ];
	}
	catch (e) {}

	console.error('Module `'+ path +'`('+ _path +').');
}

function simplify (name)
{
	if (~ name.indexOf('/'))
	{
		name = Path.basename(name, '.js');
	}

	name = name
		.replace(/-/g, '_')
		.replace(/[^a-zA-Z01-9_]/g, '');

	return name;
}
