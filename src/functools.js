


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

var reFunction = /^(function(?:[^{]*){)/;

functools.signature = function (fn)
{
	var
		view  = fn.toString(),
		match = reFunction.exec(view);

	if (match)
	{
		console.log(clc.bold(match[1]) + ' ...');
	}
};
