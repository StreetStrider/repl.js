


module.exports = functools = {};

var clc = require('cli-color');

functools.expose = function expose (value, name)
{
	name || (name = '_');
	global[name] = value;
};

functools.logAs = function logAs (name)
{
	return console.log.bind(console, name);
};

var reFunction = /^(function(?:[^{]*))({[\s\S]*)/;

functools.signature = function signature (fn, bodyToo)
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

functools.sgg = function sourceCode (fn)
{
	return functools.sg(fn, true);
};

functools.noop = function noop () {};

functools.constant = function constant (value)
{
	return function ()
	{
		return value;
	};
};

functools.identity = function identity (value)
{
	return value;
};

functools.same = functools.identity;

functools.get = function get (name)
{
	return function getter (object)
	{
		return object[name];
	};
};

functools.mapget = function mapget (name)
{
	return function mapgetter (L)
	{
		return L.map(functools.get(name));
	};
};

functools.keys = function keys (object)
{
	return Object.keys(object);
};

functools.keysall = function keysall (object)
{
	return Object.getOwnPropertyNames(object);
};

functools.keysall$ = function keysall$ (object)
{
	var r = [];
	do
	{
		functools.keysall(object)
		.forEach(function (name)
		{
			if (r.indexOf(name) === -1)
			{
				r.push(name);
			}
		})
	}
	while (object = Object.getPrototypeOf(object));
	return r;
};
