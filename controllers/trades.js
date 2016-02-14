"use strict";
module.exports = function(app) {

var mongoose = require('mongoose');
var Book = require(process.cwd() + "/dbmodels/book.js"); Book = mongoose.model("Book");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");
var requireLogin = require(process.cwd() + "/controllers/controlHelpers/requireLogin.js");
    
app.get("/pendingTrades", requireLogin, function(req, res){
    
    var pendingTrades = [];
    
    User.findOne({"_id": req.session.sessionID}, function(err, myData){
        for(let i = 0; i < myData.pendingTrades.length; i++){
            User.findOne({"_id": myData.pendingTrades.tradePartner}, function(err, traderData) {
                Book.findOne({"_id": myData.pendingTrades.bookGiven}, function(err, givenBookData){
                    Book.findOne({"_id": myData.pendingTrades.bookReceived}, function(err, receivedBookData){
                        if(!myData.pendingTrades[i].accepted){
                          pendingTrades.push({"tradePartnerData": traderData, "givenBookData": givenBookData, "receivedBookData": receivedBookData,
                         "canAccept": req.session.sessionID != myData.PendingTrades[i].proposedBy, "tradeID": myData.pendingTrades[i]._id});   
                        }
                         if(i == myData.pendingTrades.length-1){
                             res.render("pendingTrades", {"pendingTrades": pendingTrades});
                         }
                    });
                });
            });
        }
    });
});
app.get("/proposeTrade/:id", requireLogin, function(req, res){
    req.session.successMessage = null;
    req.session.errorMessage = null;
    var bookReceivedID = req.params.id;
        var myBooks = [];
    var bookStream = Book.find({"ownerID": req.session.sessionID}).limit(500).stream();
    bookStream.on("data", function(doc){
            myBooks.push({"title":doc.title, "author":doc.author, "description":doc.description, "id":doc._id});
    });
    bookStream.on("end", function(){
        Book.findOne({"_id": bookReceivedID}, function(err, doc){
        res.render("proposeTrade", {books:myBooks, receivedBookData: doc}); 
    });
    });
});
app.post("/initiateTrade", requireLogin, function(req, res){
    var tradeData = {"bookReceived": req.body.bookReceived, "bookGiven": req.body.bookGiven, "tradePartner": req.body.tradePartner};
    User.update({"_id": req.session.sessionID}, {$addToSet: {"pendingTrades": tradeData}}, function(err, doc){
        if(doc && !err){
           req.session.successMessage = "Trade proposed!";
           res.send({});
        }
        else{
            req.session.errorMessage = "The trade failed. Please try again.";
            res.send({});
        }
    });
});
app.post("/acceptTrade", requireLogin, function(req, res) {

});
app.post("/declineTrade", requireLogin, function(req, res) {
    
});
}