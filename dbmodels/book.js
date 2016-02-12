var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({"ownerName": String, "ownerID": Schema.ObjectId, "title": String, "author": String});
  
mongoose.model('Book', BookSchema);