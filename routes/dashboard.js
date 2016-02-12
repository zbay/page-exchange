module.exports = function(app) {
    app.get("/dashboard", function(req, res){
        if(!req.session.isLoggedIn){
            res.redirect("/");
        }
        else{
            res.render("dashboard", {loggedIn: true}); 
        }
    });
}