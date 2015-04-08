


var req = module.exports = {};

req.local = function (path)
{
	return require(__dirname + '/../node_modules/' + path);
}
