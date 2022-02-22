const express = require('express');
const createError = require('http-errors');
var db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', true);
app.use('/', require('./routes/index'));

app.use( (req, res, next) => {
  next(createError(404));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ...`);
});