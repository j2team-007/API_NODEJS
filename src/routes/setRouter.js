const routeHome = require('./route_home/home.js');
const managerUser = require('./route_register/manager_user.js');
const handleError = require('../middleware/handleError.js');
const { use } = require('./route_home/home.js');

module.exports = function setRouter (app) {
	// Setup route is loccalhost:3000/
	app.use('/', routeHome);

	app.use('/user', managerUser);

	// handleError
	app.use((error, req, res, next) => {
		res.status(500).send(error.message);
	})
}
