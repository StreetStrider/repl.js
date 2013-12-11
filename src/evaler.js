


var evaler = module.exports = {};

var
	util = require('util'),
	clc  = require('cli-color');

var Promiseable = evaler.Promiseable = function Promiseable (status, result)
{
	this.status = status;
	this.result = result;
};

Promiseable.prototype.toString = function (useColors)
{
	return Promiseable.promise(this.status, useColors);
};

Promiseable.promise = function (status, useColors)
{
	if (! status)
	{
		var r = '[Promise]';
		if (useColors)
		{
			r = clc[util.inspect.styles.special](r);
		}
	}
	else
	{
		if (status !== 'timeout')
		{
			var r = util.format('[Promise: %s]', status);
			if (useColors)
			{
				var color = {
					resolved: 'green',
					rejected: 'red',
					timeout:  'red'
				}[status];
				r = clc[color](r);
			}
		}
		else
		{
			var r = '[Timeout]';
			if (useColors)
			{
				r = clc.red(r);
			}
		}
	}
	return r;
};


evaler.evaler = function evaler (cmd, context, filename, callback)
{
	try
	{
		var r = eval(cmd);
		if (r && r.then && typeof r.then === 'function')
		{
			util.print(Promiseable.promise(null, this.useColors) +'\n ...\n');

			var box = { callback: callback };
			r.then(resolved.bind(this, box), rejected.bind(this, box));

			timeout(box);
		}
		else
		{
			callback(null, r);
		}
	}
	catch (e)
	{
		callback(e);
	}
};

function resolved (box, result)
{
	var callback = box.callback;
	box.callback = noop;
	callback(null, new Promiseable('resolved', result));
}

function rejected (box, result)
{
	var callback = box.callback;
	box.callback = noop;
	callback(null, new Promiseable('rejected', result));
}

var T = 5 * 1000;

function timeout (box)
{
	setTimeout(function ()
	{
		var callback = box.callback;
		box.callback = noop;
		callback(null, new Promiseable('timeout'));
	}, T);
}

function noop () {}