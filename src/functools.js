


module.exports = functools = {};

functools.expose = function (value, name)
{
	name || (name = '_');
	global[name] = value;
};

functools.logAs = function (name)
{
	return console.log.bind(console, name);
};
