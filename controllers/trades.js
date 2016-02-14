module.exports = function(app) {

var mongoose = require('mongoose');
var Book = require(process.cwd() + "/dbmodels/book.js"); Book = mongoose.model("Book");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");
var requireLogin = require(process.cwd() + "/controllers/controlHelpers/requireLogin.js");
    
app.get("/pendingTrades", requireLogin, function(req, res){
    
    var pendingTrades = [];
    
    User.findOne({"_id": req.session.sessionID}, function(err, myData){
        for(var i = 0; i < myData.pendingTrades.length; i++){
            User.findOne({"_id": myData.pendingTrades.tradePartner}, function(err, traderData) {
                Book.findOne({"_id": myData.pendingTrades.bookGiven}, function(err, givenBookData){
                    Book.findOne({"_id": myData.pendingTrades.bookReceived}, function(err, receivedBookData){
                         pendingTrades.push({"tradePartnerData": traderData, "givenBookData": givenBookData, "receivedBookData": receivedBookData});
                    });
                });
            });
        }
    });
    res.render("pendingTrades", pendingTrades);
});
}