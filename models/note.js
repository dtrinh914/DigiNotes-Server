const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  notebookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Notebook', required: true},
  title: {type: String, required: true},
  content: String
});

module.exports = mongoose.model('Note', noteSchema);