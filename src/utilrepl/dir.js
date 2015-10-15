


exports.dir = function (repl, console)
{
	var
		context = repl.context,
		_dir    = console.dir;

	function dir (object, options)
	{
		if (! arguments.length)
		{
			object = context;
		}

		if (arguments.length <= 1)
		{
			_dir(object, 0);
		}
		else
		{
			_dir.apply(null, arguments);
		}
	}

	return dir;
}

exports.writer = function (console)
{
	var retrieve = console.dir.retrieve
	var sg = require('./sg').retrieve

	return function writer (object)
	{
		if (typeof object !== 'function')
		{
			return retrieve(object, 1)
		}
		else
		{
			return sg(object)
		}
	}
}
