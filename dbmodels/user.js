var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({"name": String, "email": {type: String, unique: true}, "password": String, "phone": String, "city": String, "region": String});
  
mongoose.model('User', UserSchema);