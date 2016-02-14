var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({"ownerID": Schema.ObjectId, "title": String, "author": String, "description": String, 
"proposedTrades":  [{"bookReceived": Schema.ObjectId ,"tradePartner": Schema.ObjectId}]});
  
mongoose.model('Book', BookSchema);