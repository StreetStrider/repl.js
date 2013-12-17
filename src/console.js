


var
	util = require('util'),

	_   = require('lodash'),
	clc = require('cli-color'),

	console_error = console.error,
	console_warn  = console.warn,
	console_info  = console.info;

module.exports = console;

console.color = clc; 

function red (x)
{
	return clc.red(x);
}

console.error = function error ()
{
	arguments = _.map(arguments, red);
	console_error.apply(console, arguments);
};


function yellow (x)
{
	return clc.xterm(214)(x);
}

console.warn = function warn ()
{
	arguments = _.map(arguments, yellow);
	console_warn.apply(console, arguments);
};


function blue (x)
{
	return clc.blue(x);
}

console.info = function info ()
{
	arguments = _.map(arguments, blue);
	console_info.apply(console, arguments);
};


console.dir = function dir (object, options)
{
	object  || (object = global);
	options || (options = 0);
	if (typeof Object(options).valueOf() === 'number')
	{
		options = { depth: options };
	}
	_.extend(options, { colors: true });
	console.log(util.inspect(object, options));
};
