/*
 * name
 * path
 * alias=name
 * alias=path
 */

var Path = require('path');

module.exports = function parseArgs (modules)
{
	var context = {};

	modules.forEach(function (module)
	{
		var pair, alias, path, mod;

		pair = tryPair(module);
		if (! pair) return;

		alias = pair[0];
		path  = pair[1];

		mod = tryModule(path);
		if (! mod) return;

		if (alias === path)
		{
			console.info('Loaded `'+ path +'`.');
		}
		else
		{
			console.info('Loaded `'+ path +'` as `'+ alias +'`.');
		}

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
	try
	{
		if (isPathAndRelative(path))
		{
			path = Path.join(process.cwd(), path);
		}
		return require(path);
	}
	catch (e)
	{
		console.error('Module `'+ path +'`('+ _path +'): '+ e);
	}
}

function isPathAndRelative (path)
{
	if (~ path.indexOf('/') || ~ path.indexOf('.js'))
	{
		return Path.resolve(path) !== path;
	}
	return false; // not a path at all
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
