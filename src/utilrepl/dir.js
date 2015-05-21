


module.exports = function (repl, console)
{
	var
		context = repl.context,
		dir     = console.dir;

	function dir (object)
	{
		if (! arguments.length)
		{
			object = context
		}

		cdir(object, 0);

		/* @todo: return value issue */
		// return 'LOL'
	}

	return dir;
}
