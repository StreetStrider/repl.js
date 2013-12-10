


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
		var r = util.format('[Promise: %s]', status);
		if (useColors)
		{
			var color = {
				resolved: 'green',
				rejected: 'red'
			}[status];
			r = clc[color](r);
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

			// timeout here {#box}
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

function resolved (callback, result)
{
	callback = callback.callback;
	callback(null, new Promiseable('resolved', result));
}

function rejected (callback)
{
	callback = callback.callback;
	callback(null, new Promiseable('rejected', result));
}
