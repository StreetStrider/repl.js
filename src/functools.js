


module.exports = functools = {};

var clc = require('cli-color');

functools.expose = function (value, name)
{
	name || (name = '_');
	global[name] = value;
};

functools.logAs = function (name)
{
	return console.log.bind(console, name);
};

var reFunction = /^(function(?:[^{]*))({[\s\S]*)/;

functools.signature = function (fn, bodyToo)
{
	var
		view  = fn.toString(),
		match = reFunction.exec(view),
		out;

	if (match)
	{
		if (bodyToo)
		{
			out = clc.bold(match[1]) + match[2];
		}
		else
		{
			out = clc.bold(match[1].trim());
		}
		console.log(out);
	}
};

functools.sg = functools.signature;

functools.sgg = function (fn)
{
	return functools.sg(fn, true);
};

functools.noop = function noop () {};

functools.constant = function (value)
{
	return function ()
	{
		return value;
	};
};

functools.same = function (value)
{
	return value;
};

functools.get = function (name)
{
	return function (object)
	{
		return object[name];
	};
};

functools.mapget = function (name)
{
	return function (L)
	{
		return L.map(functools.get(name));
	};
};
