


var
	util = require('util'),
	$Console = require('console').Console,

	_   = require('lodash'),
	clc = require('cli-color');

module.exports = Console;

function Console (stdout, stderr, context)
{
	stdout  || (stdout  = process.stdout);
	stderr  || (stderr  = process.stdout);
	context || (context = global);

	$Console.call(this, stdout, stderr, context);
	this.dir$ = this.dir$.bind(this);

	this.global = context;
}

Console.prototype = Object.create($Console.prototype,
{
	constructor: { value: Console },
	color:       { value: clc }
});

Console.prototype.error = function error ()
{
	arguments = _.map(arguments, red);
	$Console.prototype.error.apply(this, arguments);
};

function red (x)
{
	return clc.red(x);
}

Console.prototype.warn = function warn ()
{
	arguments = _.map(arguments, yellow);
	$Console.prototype.warn.apply(this, arguments);
};

function yellow (x)
{
	return clc.xterm(214)(x);
}

Console.prototype.info = function info ()
{
	arguments = _.map(arguments, blue);
	$Console.prototype.info.apply(this, arguments);
};

function blue (x)
{
	return clc.blue(x);
}

Console.prototype.dir = function dir (object, options)
{
	object  || (object  = this.global);
	options || (options = 0);
	if (typeof Object(options).valueOf() === 'number')
	{
		options = { depth: options };
	}
	_.extend(options, { colors: true });
	this.log(util.inspect(object, options));
};

Console.prototype.dir$ = function dir$ (object)
{
	this.dir(object, Infinity);
};
