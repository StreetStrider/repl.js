


var util = require('util');

module.exports = function writer (value)
{
	return util.inspect(value, {
		depth: 0,
		colors: this.useColors
	});
};
