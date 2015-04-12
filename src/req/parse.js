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
		console.log(item)
		return pair(item);
	}
	else
	{
		console.log(2)
		return pure(item);
	}
}


function pair (item)
{
	var match = rPair.exec(item);

	if (match)
	{
		return {
			alias: '',
			path:  ''
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


parse.attempt = function (item)
{
	// require
	try
	{
		var m = require.resolve(item.path);
	}
	catch (e)
	{
		console.error(e);
		return;
	}

	console.dir(m);
}
