const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
});

module.exports = mongoose.model('Notebook', notebookSchema);