


module.exports = function (repl, console)
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

		/* @todo: return value issue */
		// return 'LOL'
	}

	return dir;
}
