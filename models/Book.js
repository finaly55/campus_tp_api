var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Model d'un livre
 */
var bookSchema = new Schema({
  _id: Schema.Types.ObjectId,
  label : String,
  author_id:  {type: Schema.Types.ObjectId, ref: 'Author'}
}, { versionKey: false });

module.exports = mongoose.model('Book', bookSchema);
