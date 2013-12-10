


var
	util   = require('util'),
	clc    = require('cli-color'),
	expose = require('./functools').expose;

module.exports = function writer (value)
{
	if (value.then && typeof value.then === 'function')
	{
		// async
		value.then(asyncSuccess.bind(this), asyncError.bind(this));

		return clc[util.inspect.styles.special](_promise);
	}
	else
	{
		return inspect.call(this, value);
	}
};

function asyncSuccess (value)
{
	asyncOutput.call(this, 'green', value);
}

function asyncError (value)
{
	asyncOutput.call(this, 'red', value);
}

function asyncOutput (color, value)
{
	expose(value);
	util.print(
		'\n'+ clc[color](_promise) +'\n'+
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

var _promise = '[Promise]';
