module.exports = function(app) {
    var bcrypt = require("bcrypt");
    var mongoose = require('mongoose');
    var User = require(process.cwd() + "/dbmodels/user.js");
    User = mongoose.model("User");
    
app.get("/signup", function(req, res){
	if(!req.session.isLoggedIn){
		res.render('signup', {});
	}
	else{
		 res.render("dashboard", {loggedIn: true});
	}
});

app.post('/signup', function(req, res){ //submit new account info
	if(req.session.isLoggedIn){
		res.render("dashboard", {loggedIn: true});
	}
else{
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
   res.render("login");
   	}
   	else{
   		res.render("signup", {error:findErr});
   	}
   });
   	}
   	else{
   		res.render("signup", {error: "An account already exists with this email address! Use another one."});
   	}
   });

  }
  else{
  	res.render('signup', {error:" Error: invalid information. Enter a valid email, a name longer than 2 characters, and a password longer than 6 characters."});
  }
}
});
}