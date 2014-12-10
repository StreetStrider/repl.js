


var
	util        = require('util'),
	clc         = require('cli-color'),
	Promiseable = require('./evaler').Promiseable;

module.exports = function writer (value)
{
	if (value instanceof Promiseable)
	{
		util.print(clc.up(1));
		util.print('    \n');
		util.print(clc.up(2));

		util.print(value.toString(this.useColors) +'\n');

		value = value.result;
		this.context._ = value;
		return inspect.call(this, value);
	}
	else
	{
		return inspect.call(this, value);
	}
};

function inspect (value)
{
	return util.inspect(value, {
		depth: 0,
		colors: this.useColors
	});
}
