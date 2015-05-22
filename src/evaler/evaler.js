


var
	vm = require('vm'),
	Promise = require('promise');

module.exports = function Evaler (options, console)
{
	var
		vmEvaler,
		noDisplay = { displayErrors: false };


	if (options.useGlobal)
	{
		vmEvaler = function (script)
		{
			return script.runInThisContext(noDisplay);
		}
	}
	else
	{
		vmEvaler = function (script, context)
		{
			return script.runInContext(context, noDisplay);
		}
	}

	return function (code, context, filename, callback)
	{
		try
		{
			var script = new vm.Script(code, {
				filename: filename,
				displayErrors: false
			});
		}
		catch (e)
		{
			/* don't know what actually I did */
			if (code !== '.scope')
			{
				console.error(e);
			}
			return callback();
		}

		new Promise(function (rs, rj)
		{
			rs(vmEvaler(script, context));
		})
		.then(ok, error);

		function ok (result)
		{
			callback(null, result);
		}
		function error (error)
		{
			console.trace(error);
			callback();
		}
	}

	return evaler;
}
