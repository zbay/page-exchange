var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var TradeSchema = new Schema({"proposerID": Schema.ObjectId, "proposerBookID": Schema.ObjectId, "proposeeID": Schema.ObjectId, "proposeeBookID": Schema.ObjectId,
  "accepted": {type: Boolean, default: false}
 });
   
 mongoose.model('Trade', TradeSchema);