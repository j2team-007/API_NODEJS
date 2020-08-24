class HomeController {

	renderHome (req, res, next) {
		res.render('general/home');
	}

}

module.exports = new HomeController;
