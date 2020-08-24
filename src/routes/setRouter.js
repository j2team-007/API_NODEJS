const routeHome = require('./home.js');

module.exports = function setRouter (app) {
	// Setup route is loccalhost:3000/
	app.use('/', routeHome);
}
