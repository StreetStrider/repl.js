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


/* patch-from */
parse.patch = function (patch)
{
	patch(module);
}

var
	resolve = require('path').resolve;

parse.attempt = function (item)
{
	if (item.error)
	{
		return item;
	}
	else try
	{
		var
			path = item.path,
			orig = path,
			name = require.resolve(path);
	}
	catch (e)
	{
		var
			path = resolve(item.path);

	try
	{
		var name = require.resolve(path);
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
			path:  path,
			mod:   require(path)
		};
	}
}


var
	basename = require('path').basename,
	rTrash = r('[/\\-.]', 'g');

parse.canonize = function (item)
{
	if (item.error)
	{
		return item;
	}
	if (item.alias)
	{
		return item;
	}
	else
	{
		return {
			alias: detrash(item.path),
			path: item.path,
			mod: item.mod
		};
	}
	return item;
}

function detrash (str)
{
	str = basename(str, '.js');
	str = str.replace(rTrash, '_');

	return str;
}


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
			console.info('%s ⇐ %s', item.alias, item.path);
		}
	}
}

function err (item)
{
	switch (item.error)
	{
	case 'parse_pair':
		return 'cannot parse module `'+ item.input +'`';

	case 'resolve':
		return 'cannot resolve module `'+ item.input +'`';
	}
}
