


var
	util   = require('util'),
	clc    = require('cli-color'),
	expose = require('./functools').expose;

module.exports = function writer (value)
{
	if (value.then && typeof value.then === 'function')
	{
		// async
		value.then(asyncResolved.bind(this), asyncRejected.bind(this));

		return clc[util.inspect.styles.special](_promise());
	}
	else
	{
		return inspect.call(this, value);
	}
};

function asyncResolved (value)
{
	asyncOutput.call(this, 'resolved', value);
}

function asyncRejected (value)
{
	asyncOutput.call(this, 'rejected', value);
}

function asyncOutput (status, value)
{
	var color = {
		resolved: 'green',
		rejected: 'red'
	}[status];

	expose(value);
	util.print(
		'\n'+ clc[color](_promise(status)) +'\n'+
		inspect.call(this, value) +'\n'+
		this.prompt
	);
}

function inspect (value)
{
	return util.inspect(value, {
		depth: 0,
		colors: this.useColors
	});
}

function _promise (status)
{
	if (! status)
	{
		return '[Promise]';
	}
	else
	{
		return util.format('[Promise: %s]', status);
	}
}
