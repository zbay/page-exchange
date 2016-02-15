module.exports = function(app) {
app.get('/', function(req, res){
        if(!req.session.isLoggedIn){
          res.render("dashboard", {loggedIn: false});
        }
        else{
         res.render("dashboard", {loggedIn: true});
        }
});
}