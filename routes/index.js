module.exports.set = function(app) {
	return require('./routers')(app);
}