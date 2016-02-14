"use strict";
module.exports = function(app) {
var mongoose = require('mongoose');
var Book = require(process.cwd() + "/dbmodels/book.js"); Book = mongoose.model("Book");
var User = require(process.cwd() + "/dbmodels/book.js"); User = mongoose.model("User");

var requireLogin = require(process.cwd() + "/controllers/controlHelpers/requireLogin.js");
     
app.get("/myBooks", requireLogin, function(req, res){
    var myBooks = [];
    var bookStream = Book.find({"ownerID": req.session.sessionID}).limit(500).stream();
    bookStream.on("data", function(doc){
            myBooks.push({"title":doc.title, "author":doc.author, "description":doc.description, "id":doc._id});
    });
    bookStream.on("end", function(){
         User.findOne({"_id": req.session.sessionID}, function(err, data){
        res.render("myBooks", {"books":myBooks, "trades": data.pendingTrades.length, "success": req.session.successMessage, "error": req.session.errorMessage});
         });
    });
    });
    
app.post("/myBooks", requireLogin, function(req, res){
    if(req.body.title && req.body.author){
        var newBook = new Book({"ownerID": req.session.sessionID, "title": req.body.title, "author": req.body.author, "description": req.body.description});
     newBook.save(function(err){
         if(!err){
             Book.findOne({"ownerID": req.session.sessionID, "title": req.body.title, "author": req.body.author, "description": req.body.description}, function(error, data){
                 res.send({"success": "Book successfully added!", "id": data._id, "title": req.body.title, "author": req.body.author, "description": req.body.description}); 
             });
         }
     });   
    }
    else{
        res.send({"error": "To add a book, the author and title fields must be filled out. Try again."});
    }
});
app.post("/deleteBook", requireLogin, function(req, res){
    Book.remove({"_id": req.body.deleteID, "ownerID": req.session.sessionID}, function(err, doc){
        if(doc && !err){
            res.send({"success": "The selected book was successfully deleted."});
        }
    });
});
app.get("/availableBooks", requireLogin, function(req, res){
    var allBooksButMine = [];
    var otherBooks = Book.find({"ownerID": {$ne: req.session.sessionID}}).limit(500).stream();
    otherBooks.on("data", function(book){
        allBooksButMine.push(book);
    });
    otherBooks.on("end", function(){
        User.findOne({"_id": req.session.sessionID}, function(err, data){
            res.render("availableBooks", {"books": allBooksButMine, "trades": data.pendingTrades.length}); 
        });
    });
    });

}