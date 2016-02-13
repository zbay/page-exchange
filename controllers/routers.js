function routers(app){
	//all of the app's route controllers
var loginStatus = require("./loginStatus.js"); loginStatus(app);
var home = require("./home.js"); home(app);
var signup = require("./signup.js"); signup(app);
var dashboard = require("./dashboard.js"); dashboard(app);
var settings = require("./settings.js"); settings(app);
var httpErrors = require("./httpErrors.js"); httpErrors(app);
var books = require("./books.js"); books(app);
var trades = require("./trades.js"); trades(app);
}
module.exports = routers;