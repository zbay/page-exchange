"use strict";
//to-do: make trade success and error messages work. Make a page to view accepted trades, with contact info. And make the incoming/outgoing page actually render
module.exports = function(app) {

var mongoose = require('mongoose');
var Book = require(process.cwd() + "/dbmodels/book.js"); Book = mongoose.model("Book");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");
var Trade = require(process.cwd() + "/dbmodels/trade.js"); Trade = mongoose.model("Trade");
var requireLogin = require(process.cwd() + "/controllers/controlHelpers/requireLogin.js");
    
app.get("/pendingTrades/incoming", requireLogin, function(req, res){
    
    var pendingTrades = [];
    
    Trade.find({"proposeeID": req.session.sessionID}, function(err, tradeDocs){
        for(let i = 0; i < tradeDocs.length; i++){
        User.findOne({"_id": tradeDocs[i].proposerID}, function(err, traderData){
            Book.findOne({"_id": tradeDocs[i].proposeeBookID}, function(err, givenBookData){
                    Book.findOne({"_id": tradeDocs[i].proposerBookID}, function(err, receivedBookData){
                         pendingTrades.push({"tradePartnerData": traderData, "givenBookData": givenBookData, "receivedBookData": receivedBookData,
                         "tradeID": tradeDocs[i]._id});   
                         
                        if(!tradeDocs[i].accepted){
                         pendingTrades.push({"tradePartnerData": traderData, "givenBookData": givenBookData, "receivedBookData": receivedBookData,
                         "tradeID": tradeDocs[i]._id});   
                        }
                        if(i == tradeDocs.length-1){
                            res.render("pendingTradesIncoming", {"pendingTrades": pendingTrades});
                        }
                });
            });
        });
        }
        if(err || !tradeDocs.length){
            res.render("pendingTradesIncoming");
        }
    });
});

app.get("/pendingTrades/outgoing", requireLogin, function(req, res){
    
    var pendingTrades = [];
    
    Trade.find({"proposerID": req.session.sessionID}, function(err, tradeDocs){
        for(let i = 0; i < tradeDocs.length; i++){
            User.findOne({"_id": tradeDocs[i].proposeeID}, function(err, traderData){
            //console.log("traderData: " + traderData);
                Book.findOne({"_id": tradeDocs[i].proposerBookID}, function(err, givenBookData){
                //console.log("givenBookData: " + givenBookData);
                    Book.findOne({"_id": tradeDocs[i].proposeeBookID}, function(err, receivedBookData){
                        //console.log("receivedBookData: " + receivedBookData);
                        if(!tradeDocs[i].accepted){
                         pendingTrades.push({"tradePartnerData": traderData, "givenBookData": givenBookData, "receivedBookData": receivedBookData,
                         "tradeID": tradeDocs[i]._id});   
                        }
                        if(i == tradeDocs.length-1){
                            res.render("pendingTradesOutgoing", {"pendingTrades": pendingTrades});
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
    var newTrade = new Trade({"proposerID": req.session.sessionID, "proposeeBookID": req.body.bookReceived, "proposerBookID": req.body.bookGiven, "proposeeID": req.body.tradePartner});
    newTrade.save(function(err, message){
          req.session.successMessage = "Trade proposed!";
          res.send({});
    });
});
app.post("/acceptTrade", requireLogin, function(req, res) {
    Trade.update({"_id": req.body.tradeID}, {$set: {"accepted": true}}, function(){
        res.send({"success": "Trade accepted!"}); 
    });
});
app.post("/declineTrade", requireLogin, function(req, res) {
    Trade.remove({"_id": req.body.tradeID}, function(){
        res.send({"success": "Trade declined."});
    });
});
app.post("/revokeTrade", requireLogin, function(req, res){
    Trade.remove({"_id": req.body.tradeID}, function(){
        res.send({"success": "Trade offer revoked."});
    });
});
}