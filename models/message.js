const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
},
  { timestamps: true }
);

messageSchema.virtual('formatedDate').get(function () {
  return this.createdAt.toLocaleString();
});

module.exports = mongoose.model("Message", messageSchema);
