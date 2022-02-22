const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: String
})

const notebookSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  notes: [noteSchema]
});

module.exports = mongoose.model('Notebook', notebookSchema);