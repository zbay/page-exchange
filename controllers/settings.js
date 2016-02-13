var mongoose = require('mongoose'); 
var bcrypt = require("bcrypt");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");
var requireLogin = require(process.cwd() + "/controllers/controlHelpers/requireLogin.js");

module.exports = function(app) {
    app.get("/settings", requireLogin, function(req, res){
            User.findOne({"_id": req.session.sessionID}, function(err, doc){
                if(doc && !err){
                     res.render("settings", {userPhone: doc.phone, userCity: doc.city, userRegion: doc.region, userEmail: doc.email});
                }
            });
    });
    
    app.post("/settingsOptional", function(req, res){ //profile info changes
            User.update({"_id": req.session.sessionID}, {$set: {"city": req.body.city, "region": req.body.region, "phone": req.body.phone}}, function(err, doc){
            if(doc && !err){
                res.send({"success": "Profile updated!"});
            }
            else{
                res.send({"error": "There was an error when updating your profile info. Try again."});
            }
            });
    });
    app.post("/settingsVital", function(req, res){ //email/password info changes
                var newEmail = req.body.email;
		        var oldPassword = req.body.oldPassword;
		        var newPassword = req.body.newPassword;
		        var emailRegex = /@/;
                if(newEmail && oldPassword && newPassword){
                    		User.findOne({"_id": req.session.sessionID}).lean().exec(function(err, doc){
			var hashedPassword = doc.password;
  	if(doc && !err && newEmail.match(emailRegex) && newPassword.length > 6 && bcrypt.compareSync(oldPassword, hashedPassword)){
  		var userID = doc._id;
  		User.update({"_id": req.session.sessionID}, {"$set": {"password": bcrypt.hashSync(newPassword, 10), "email": newEmail}}, function(err, data){
  			if(!err){
  					res.send({"success": "Email/password info successfully updated!"});
  			}
  			else{
  				res.send({"error": "Error. That  email address is associated with another account. Use a different one."});
  			}
  		});
  	}
    else{
    	res.send({"error": "Error: unsuccessful password or email change. Make sure you entered your old password correctly, and that the new one is at least 7 characters in length."});
    }
  });
                }
                else{
                    res.send({"error": "To change email or password, make sure all three fields are filled out."});
                }
    });
}