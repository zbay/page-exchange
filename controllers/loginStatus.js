var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");

module.exports = function(app) {
    app.get("/login", function(req, res){
    if(req.session.isLoggedIn){
      res.redirect("dashboard");
    }
    else{
      res.render("login");
    }
    });
    
    app.post("/login", function(req, res){
      var email = req.body.email;
    var password = req.body.password;
    var loginFail = "Error: incorrect email or password. Try again.";
    
    User.findOne({"email": email}, function(err, doc){
  	if(!err && doc != null){
  		var hashedPassword = doc.password;
  		if(bcrypt.compareSync(password, hashedPassword)){
  		    req.session.isLoggedIn = true;
  			req.session.sessionID = doc._id;
  		res.redirect("/dashboard");
  		}
  		else{
    	res.render("login", {error: loginFail});
    }
  	}
    else{
    	res.render("login", {error: loginFail});
    }
  });
    });
app.get("/logout", function(req, res){
  req.session.isLoggedIn = false;
  req.session.sessionID = null;
  res.redirect("/");
});
}