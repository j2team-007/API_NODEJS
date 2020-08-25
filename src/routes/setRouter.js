const routeHome = require('./route_home/home.js');

module.exports = function setRouter (app) {
	// Setup route is loccalhost:3000/
	app.use('/', routeHome);
}
