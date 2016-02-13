module.exports = function(app) {
var mongoose = require('mongoose');
var Book = require(process.cwd() + "/dbmodels/book.js"); Book = mongoose.model("Book");

var requireLogin = require(process.cwd() + "/controllers/controlHelpers/requireLogin.js");
     
app.get("/myBooks", requireLogin, function(req, res){
    var myBooks = [];
    Book.find({"ownerID": req.sessionID}, function(err, doc){
        if(doc && !err){
            for(var i = 0; i < doc.length; i++){
                myBooks.push({"title":doc.title, "author":doc.author, "description":doc.description, "id":doc._id});
                if(i == doc.length-1){
                    res.render("myBooks", {loggedIn:true, "books":myBooks});
                }
            }
            //add error handle
        }
    });
});
app.post("/myBooks", requireLogin, function(req, res){
    Book.insert();
});
app.delete("/myBooks", requireLogin, function(req, res){
    
});
app.get("/allBooks", requireLogin, function(req, res){
    
});

}