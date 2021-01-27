var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Model d'un utilisateur
 */
var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstname: {
    type: String,
    maxlength: 255,
    required: true
  },
  lastname: {
    type: String,
    maxlength: 255,
    required: true
  },
  country: String,
  books:  [{type: Schema.Types.ObjectId, ref: 'Book'}]
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);