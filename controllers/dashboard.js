module.exports = function(app) {
    var requireLogin = require(process.cwd() + "/controllers/controlHelpers/requireLogin.js");
    app.get("/dashboard", requireLogin, function(req, res){
            res.render("dashboard");
    });
}