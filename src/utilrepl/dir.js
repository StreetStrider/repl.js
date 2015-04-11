


module.exports = function (repl)
{
	var
		context = repl.context,
		cdir    = context.console.dir;

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
