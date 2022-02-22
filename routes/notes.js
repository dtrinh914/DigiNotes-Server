const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const Notebook = mongoose.model('Notebook');

// create a note
router.post('/', (req, res) => {
  const notebookId = req.body.notebookId
  const noteTitle = req.body.title;
  const noteContent = req.body.content ? req.body.content : "";

  let note;

  // check if notebook id exists
  Notebook.findById(notebookId)
    .then( notebook => {
      note = new Note({
        notebookId: notebook._id,
        title: noteTitle,
        content: noteContent
      });

      // append note id to notebook
      Notebook.findByIdAndUpdate(notebookId, {'$push': {'notes': note._id}})
        .then( notebook => {
          // save note
          note.save()
          .then((note) => {      
            res.send(note); })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500);
          });
        })
        .catch( err => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch( err => {
      console.log(err);
      res.sendStatus(400);
    });

});

// edit a note
router.put('/:noteId', (req, res) => {
  const updtObj = {};

  if(req.body.title !== undefined){
    updtObj.title = req.body.title;
  }

  if(req.body.content !== undefined){
    updtObj.content = req.body.content;
  }

  Note.findByIdAndUpdate(req.params.noteId, updtObj)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// delete a note
router.delete('/:noteId', (req, res) => {
  Note.findByIdAndDelete(req.params.noteId)
  .then(note => {
    Notebook.findByIdAndUpdate(note.notebookId, {'$pull': {notes: req.params.noteId}})
      .then(()=>{
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

module.exports = router;