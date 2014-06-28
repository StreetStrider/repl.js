


var evaler = module.exports = {};

var
	vm   = require('vm'),
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
		var r;
		if (this.useGlobal)
		{
			r = vm.runInThisContext(cmd, filename);
		}
		else
		{
			r = vm.runInContext(cmd, context, filename);
		}

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
	_clear(box, 'resolved', result);
}

function rejected (box, result)
{
	_clear(box, 'rejected', result);
}

var T = 5 * 1000;

function timeout (box)
{
	box.timer = setTimeout(function ()
	{
		_clear(box, 'timeout');
	}, T);
}

function _clear (box, status, value)
{
	clearTimeout(box.timer);
	var callback = box.callback;
	box.callback = noop;
	callback(null, new Promiseable(status, value));
}

function noop () {}
