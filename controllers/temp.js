var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");

module.exports = {
  login: function(req, res){
    if(req.session.isLoggedIn){
      res.redirect("/dashboard", {loggedIn: true});
    }
    else{
      res.render("login");
    }
  },
  loginAttempt: function(req, res){
      var email = req.body.email;
    var password = req.body.password;
    User.findOne({"email": email}, function(err, doc){
  	if(!err && doc != null){
  		var hashedPassword = doc.password;
  		if(bcrypt.compareSync(password, hashedPassword)){
  			req.session.sessionEmail = email;
  			req.session.sessionName = doc.name;
  			req.session.sessionID = doc._id;
  		res.redirect("/dashboard");
  		}
  		else{
    	//req.session.errorMessage = "Error: incorrect email or password. Try again.";
    	//req.session.successMessage = null;
    	//res.render("login", {seshName: req.session.sessionName, error: req.session.errorMessage});
    	res.render("login");
    }
  	}
    else{
    	//req.session.errorMessage = "Error: incorrect email or password. Try again.";
    	//res.render("login", {seshName: req.session.sessionName, error: req.session.errorMessage});
    	res.render("login");
    }
  });
  },
  signup: function(req, res){
    if(req.session.isLoggedIn){
      res.redirect("/dashboard", {loggedIn: true});
    }
    else{
      res.render("signup");
    }
  },
  signupAttempt: function(req, res){
      var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = bcrypt.hashSync(password, 10);
  var emailRegex = /@/;
  
  if(name && email && password && name.length > 2 && email.match(emailRegex) && password.length > 6){
   var newUser = new User({"name": name, "email":email, "password": hashedPassword}); 
   newUser.save(function(err, message){
   	if(!err)
   	{
   User.findOne({"email": email}).lean().exec(function(findErr, data){
   if(!findErr){
   //req.session.successMessage = "Account successfully created!";
   //req.session.errorMessage = null;
   res.redirect("/login");
   	}
   	else{
   		//res.render("signup", {error:findErr});
   		res.render("signup", {});
   	}
   });
   	}
   	else{
   		//req.session.successMessage = null;
   		//req.session.errorMessage = "An account already exists with this email address! Use another one.";
   		//res.render("signup", {error:req.session.errorMessage});
   		res.render("signup", {});
   	}
   });

  }
  else{
  	//req.session.errorMessage = "Error: invalid information. Enter a valid email, a name longer than 2 characters, and a password longer than 6 characters.";
  	//req.session.successMessage = null;
  	//res.render('signup', {seshName: req.session.sessionName, error: req.session.errorMessage});
  	res.render("signup", {});
  }
  },
  dashboard: function(req, res){
   if(!req.session.isLoggedIn){
     res.redirect("/");
   }
   else{
   res.render("dashboard", {loggedIn: true}); 
   }
  }
}