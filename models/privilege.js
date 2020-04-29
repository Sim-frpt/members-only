const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privilegeSchema = new Schema({
  name: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Privilege', privilegeSchema);
