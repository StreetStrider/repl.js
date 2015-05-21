


var
	vm = require('vm'),
	Promise = require('promise');

module.exports = function Evaler (options, console)
{
	var vm_evaler;
	var evaler;

	var noDisplay = { displayErrors: false };

	if (options.useGlobal)
	{
		vm_evaler = function (code)
		{
			return vm.runInThisContext(code, noDisplay);
		}
	}
	else
	{
		vm_evaler = function (code, context)
		{
			return vm.runInContext(code, context, noDisplay);
		}
	}

	evaler = function (code, context, __filename, callback)
	{
		new Promise(function (rs, rj)
		{
			rs(vm_evaler(code, context));
		})
		.then(ok, error);

		function ok (result)
		{
			callback(null, result);
		}
		function error (error)
		{
			console.trace(error);
			callback(null);
		}
	}

	return evaler;
}
