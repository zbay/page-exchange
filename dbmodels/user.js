var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({"name": String, "email": {type: String, unique: true}, "password": String, "phone": String, "city": String, "region": String,
    "pendingTrades": [{"bookGiven": Schema.ObjectId, "bookReceived": Schema.ObjectId ,"tradePartner": Schema.ObjectId, "fulfilled": {type: Boolean, default: false}}]});
  
mongoose.model('User', UserSchema);