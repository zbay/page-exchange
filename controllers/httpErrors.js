module.exports = function(app) {
app.use(function(req, res) {
	res.status(404).render("404", {loggedIn: req.session.isLoggedIn});
});
app.use(function(error, req, res, next) {
    res.status(500).render("500", {loggedIn: req.session.isLoggedIn});
});
}