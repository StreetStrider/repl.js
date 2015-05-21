


var
	vm = require('vm');

module.exports = function Evaler (options, console)
{
	var vm_evaler;
	var evaler;
	var result;

	if (options.useGlobal)
	{
		console.info('global');
		vm_evaler = function (code)
		{
			return vm.runInThisContext(code);
		}
	}
	else
	{
		console.info('non global');
		vm_evaler = function (code, context)
		{
			return vm.runInContext(code, context);
		}
	}

	evaler = function (code, context, filename, callback)
	{
		try
		{
			var result = vm_evaler(code, context);
		}
		catch (e)
		{
			return callback(e);
		}
		{
			return callback(null, result);
		}
	}

	return evaler;
}

// { displayErrors: false }
