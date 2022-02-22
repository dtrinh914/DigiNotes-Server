const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Notebook = mongoose.model('Notebook');


// get all of a users notebooks
router.get('/:userId', (req, res) => {
  Notebook.find({userId:req.params.userId}).select('-__v')
    .then((notebooks) => {
      res.send(notebooks);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// create notebook
router.post('/', (req, res) => {
  const userId = req.body.userId
  const name = req.body.name;

  const notebook = new Notebook({
    userId: userId,
    name: name
  });

  notebook.save()
    .then((notebook) => {      
      res.send(notebook); })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// edit notebook name
router.put('/:notebookId', (req, res) => {
  const name = req.body.name;
  Notebook.findByIdAndUpdate(req.params.notebookId, {name:name})
    .then(() => { 
      res.sendStatus(204); })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})

// delete notebook
router.delete('/:notebookId', (req, res) => {
  Notebook.findByIdAndDelete(req.params.notebookId)
    .then(() => { 
      res.sendStatus(204); })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})

module.exports = router;