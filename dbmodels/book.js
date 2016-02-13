var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({"ownerID": Schema.ObjectId, "title": String, "author": String, "description": String});
  
mongoose.model('Book', BookSchema);