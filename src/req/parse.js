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


function r (t)
{
	return new RegExp(t);
}

function group (t)
{
	return '(' + t + ')';
}

var
	tAll = '.*',
	tId = '[a-zA-Z_][a-zA-Z_01-9]*',
	tAlias = tId,
	tPair = group(tAlias) + '=' + group(tAll);

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

parse.attempt = function (item)
{
	if (item.error)
	{
		return item;
	}
	else try
	{
		var name = require.resolve(item.path);
	}
	catch (e)
	{
		return {
			error: 'resolve',
			input: item.path
		};
	}
	/* else */
	{
		return {
			alias: item.alias,
			mod:   require(item.path)
		};
	}
}
