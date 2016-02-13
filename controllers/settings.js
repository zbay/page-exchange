var mongoose = require('mongoose'); 
var bcrypt = require("bcrypt");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");

module.exports = function(app) {
    app.get("/settings", function(req, res){
        if(!req.session.isLoggedIn){
            res.redirect("/");
        }
        else{
            User.findOne({"_id": req.session.sessionID}, function(err, doc){
                if(doc && !err){
                     res.render("settings", {loggedIn:true, userPhone: doc.phone, userCity: doc.city, userRegion: doc.region,
                     userEmail: doc.email, error: req.session.errorMessage, success: req.session.successMessage});
                }
            });
        }
    });
    app.post("/settings", function(req, res){
        req.session.errorMessage = null;
        req.session.successMessage = null;
         if(!req.session.isLoggedIn){
            res.redirect("/");
        }
        else{
            if(req.body.formType=="optional"){
                User.update({"_id": req.session.sessionID}, {$set: {"city": req.body.city, "region": req.body.region, "phone": req.body.phoneNumber}}, function(err, doc){
                if(doc && !err){
                    console.log("optional doc: " + doc);
                    req.session.successMessage = "Changes saved!";
                    res.redirect("/settings");
                }
                else{
                    req.session.errorMessage = "There was an error when updating your profile info. Try again.";
                    res.redirect("/settings");
                }
                });
            }
            if(req.body.formType=="vital"){
                var newEmail = req.body.email;
		        var oldPassword = req.body.oldPassword;
		        var newPassword = req.body.newPassword;
                if(newEmail && oldPassword && newPassword){
                    		User.findOne({"_id": req.session.sessionID}).lean().exec(function(err, doc){
			var hashedPassword = doc.password;
  	if(doc && !err && newPassword.length > 6 && bcrypt.compareSync(oldPassword, hashedPassword)){
  		var userID = doc._id;
  		User.update({"_id": req.session.sessionID}, {"$set": {"password": bcrypt.hashSync(newPassword, 10), "email": newEmail}}, function(err, data){
  			if(!err){
  					req.session.successMessage = "Info successfully changed!";
  					res.redirect("/settings");
  			}
  			else{
  				req.session.errorMessage = "Error. That email address is associated with another account. Use a different one.";
  				res.redirect("/settings");
  			}
  		});
  	}
    else{
    	req.session.errorMessage = "Error: unsuccessful password change. Make sure you entered your old one correctly, and that the new one is at least 7 characters in length.";
    	res.redirect("/settings");
    }
  });
                }
                else{
                    req.session.errorMessage = "To change email or password, make sure all three fields are filled out.";
                    req.redirect("/settings");
                }
            }
        }
    });
}