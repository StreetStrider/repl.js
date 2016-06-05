/*

 lodash ← lodash
 alias ← alias=lodash
 file ← ./file
 file ← ./file.js
 alias ← alias=./file
 alias ← alias=./file.js
 file ← resolve(file)
 file ← alias=resolve(file)

 1. direct resolve
 2. resolve as path

*/

var parse = module.exports = {};


function r (t, f)
{
	return new RegExp(t, f);
}

function group (t)
{
	return '(' + t + ')';
}

function whole (t)
{
	return '^' + t + '$';
}

var
	tAll = '.*',
	tId = '[a-zA-Z_][a-zA-Z_01-9]*',
	tPair = whole(group(tId) + '=' + group(tAll));

var
	rPair = r(tPair);


parse.build = function (item)
{
	if (~ item.indexOf('='))
	{
		return pair(item);
	}
	else
	{
		return pure(item);
	}
}


function pair (item)
{
	var match = rPair.exec(item);

	if (match)
	{
		return {
			alias: match[1],
			path:  match[2]
		};
	}
	else
	{
		return {
			error: 'parse_pair',
			input: item
		}
	};
}

function pure (item)
{
	return {
		alias: null,
		path:  item
	};
}


var p_resolve = require('path').resolve
var Module = require('module')

parse.Attempter = function (filename)
{
	var module = parse.Module(filename)

	// var require = Module._load
	// var resolve = Module._resolveFilename

	var require = module.require
	var resolve = require.resolve

	var attempter = passerror(function (item)
	{
		try
		{
			var
				path = item.path,
				orig = path;

			path = resolve(path, module);
		}
		catch (e)
		{
			path = p_resolve(item.path);

		try
		{
			path = resolve(path, module);
		}
		catch (e)
		{
			return {
				error: 'resolve',
				input: orig
			};
		}

		}
		/* else */
		{
			return {
				alias: item.alias,
				orig:  orig,
				path:  path,
				mod:   require(path, module)
			};
		}
	})

	return attempter
}

parse.Module = function (filename)
{
	filename || (filename = process.cwd() + '/repl-module.js')

	var module = new Module(filename)

	module.filename = filename

	module.paths = Module._nodeModulePaths(filename)

	module.require.resolve = function (path)
	{
		return Module._resolveFilename(path, module)
	}

	return module
}


var
	basename = require('path').basename,
	rTrash = r('[/\\-.]', 'g');

parse.canonize = passerror(function (item)
{
	if (item.alias)
	{
		return item;
	}
	else
	{
		return {
			alias: detrash(item.orig),
			orig: item.orig,
			path: item.path,
			mod: item.mod
		};
	}
	return item;
})

function detrash (str)
{
	str = basename(str, '.js');
	str = basename(str, '.json');
	str = str.replace(rTrash, '_');

	return str;
}


var
	format = require('util').format;

parse.report = function (console)
{
	return function (item)
	{
		if (item.error)
		{
			console.error(err(item));
		}
		else
		{
			var what;
			if (item.orig === item.path)
			{
				what = item.orig;
			}
			else
			{
				what = format('%s (%s)', item.orig, item.path);
			}
			console.info('%s ⇐ %s', item.alias, what);
		}
	}
}

function err (item)
{
	switch (item.error)
	{
	case 'parse_pair':
		return format('cannot parse module `%s`', item.input);

	case 'resolve':
		return format('cannot resolve module `%s`', item.input);
	}
}

function passerror (fn)
{
	return function (item)
	{
		if (item.error)
		{
			return item;
		}
		else
		{
			return fn(item);
		}
	}
}
