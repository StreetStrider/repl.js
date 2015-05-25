


exports.dir = function (repl, console)
{
	var
		context = repl.context,
		_dir    = console.dir;

	function dir (object)
	{
		if (! arguments.length)
		{
			object = context;
		}

		_dir(object, 0);
	}

	return dir;
}

exports.writer = function (console)
{
	var retrieve = console.dir.retrieve;

	return function writer (object)
	{
		return retrieve(object, 1);
	}
}
