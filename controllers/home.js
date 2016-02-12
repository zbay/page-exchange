module.exports = function(app) {
app.get('/', function(req, res){
        if(!req.session.isLoggedIn){
          console.log('rendering index!');
          res.render("index");
        }
        else{
         res.render("dashboard", {loggedIn: true});
        }
});
}