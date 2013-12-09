


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
